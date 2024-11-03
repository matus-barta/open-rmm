use clap::{Parser, Subcommand};
use config::Config;

mod client;
mod config;
mod installer;

#[derive(Parser, Debug)]
#[command(version, about="Open-RMM Agent", long_about = None, after_help="No arguments will run Agent to collect data.")]
struct Cli {
    /// Generated One Time Key to register computer in Open-RMM (64 characters)
    #[arg(short, long)]
    otk: Option<String>,

    /// Url to server
    #[arg(short, long, default_value = "http://127.0.0.1:54321")]
    url: Option<String>,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Install as daemon/service, run together or after registering the computer
    Install,
    /// Remove as daemon/service, to remove from Open-RMM use dashboard
    Remove,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    if let Some(url) = cli.url.as_deref() {
        config::save_config(Config {
            supabase_url: url.to_string(), //FIXME: this is incorrect, we are saving url to supabase
        }) //but instead we should be saving Server url from where we would download config including supabase url.
        .await?;
    }

    let client = client::Client {
        config: config::load_config()
            .await
            .expect("Can't load config file! Should be provided with executable."),
    };

    if let Some(otk) = cli.otk.as_deref() {
        if otk.len() == 64 {
            client.register_computer(otk.to_string()).await?;
        } else {
            panic!("One Time key has to be 64 characters long!");
        }
    }

    match &cli.command {
        Some(Commands::Install) => {
            println!("install")
        }
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
