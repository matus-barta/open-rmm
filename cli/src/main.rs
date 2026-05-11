use clap::{Parser, Subcommand};
use config::Config;

mod client;
mod config;
mod installer;
mod utils;

#[derive(Parser, Debug)]
#[command(version, about="Open-RMM Agent", long_about = None, after_help="No arguments will run Agent to collect data.")]
struct Cli {
    /// Generated One Time Key to register computer in Open-RMM (64 characters)
    #[arg(short, long)]
    otk: Option<String>,

    /// URL to server (from where it will download config) - if config exists, will ignore this value (won't override url in config)
    #[arg(short, long, default_value = "http://127.0.0.1:54321")]
    url: Option<String>,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Install as daemon/service, run together or after registering the computer
    Install,
    /// Remove as daemon/service, to remove from Open-RMM use Dashboard
    Remove,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    let config_data: Option<Config> = config::handle_config(cli.url).await;

    let client = client::Client {
        config: config_data.expect("don't have valid config"),
    };

    if let Some(otk) = cli.otk.as_deref() {
        if otk.len() == 64 {
            client.register_computer(otk.to_string()).await?;
        } else {
            panic!("One Time key has to be 64 characters long!");
        }
    }

    match &cli.command {
        Some(Commands::Install) => installer::self_installer()?,
        Some(Commands::Remove) => {
            println!("remove")
        }
        None => {
            println!("Running report system info.");
            client.report_system_info().await?;
        }
    }

    Ok(())
}
