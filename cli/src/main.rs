use clap::Parser;
use std::process::ExitCode;

use cli::{Cli, Commands};
use error::AppError;

mod cli;
mod client;
mod config;
mod error;
mod installer;
mod log;
mod shutdown;
mod utils;
mod worker;

#[tokio::main]
async fn main() -> ExitCode {
    let cli = Cli::parse();

    // Initialize tracing/logging early
    match log::init_tracing(cli.verbose, cli.quiet, cli.no_file_log, cli.log_dir.clone()) {
        Ok(g) => g,
        Err(e) => {
            eprintln!("Failed to initialize logging: {e:?}");
            return ExitCode::from(1);
        }
    };

    install_panic_hook();

    match run(cli).await {
        Ok(()) => ExitCode::SUCCESS,
        Err(err) => {
            // Log full detail for diagnostics
            tracing::error!(error = ?err, "fatal error");

            // Friendly stderr message
            eprintln!("Error: {err}");

            // Map to exit code (downcast to AppError if possible)
            let code = exit_code_from_anyhow(&err);
            ExitCode::from(code)
        }
    }
}

async fn run(cli: Cli) -> anyhow::Result<()> {
    let config_data = config::handle_config(cli.url).await?;

    let client = client::Client {
        config: config_data,
    };

    match cli.command {
        Some(Commands::Register { otk }) => {
            client.register_computer(otk.to_string()).await?;
        }
        Some(Commands::Install) => installer::self_installer().await?,
        Some(Commands::Remove) => {
            todo!()
        }
        Some(Commands::Background) => {
            let interval_secs: u64 = 60 * 5;

            tokio::select! {
                res = worker::background_worker(interval_secs) => res,
                _ = shutdown::shutdown_signal() => {
                    tracing::info!("shutdown requested; exiting background worker");
                    Ok(())
                }
            }?;
        }
        None => {
            worker::do_one_cycle().await?;
        }
    }
    Ok(())
}

fn exit_code_from_anyhow(err: &anyhow::Error) -> u8 {
    if let Some(app) = err.downcast_ref::<AppError>() {
        app.exit_code()
    } else {
        1
    }
}

fn install_panic_hook() {
    std::panic::set_hook(Box::new(|info| {
        tracing::error!(panic = %info, "panic occurred");
        eprintln!("A fatal internal error occurred. See logs for details.");
    }));
}
