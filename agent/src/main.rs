use clap::{Parser, Subcommand};
use config::{config_exists, Config};

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

    let mut config_data: Option<Config> = None;

    // Move all this config handling to Config
    // check for local copy then check if online is newer
    // if newer - download - if unable to save just return downloaded
    // if not local - download
    // if local newest load local
    // return config

    if config_exists() {
        config_data = Some(config::load_config().await.expect("Unable to load config"))
    } else {
        if let Some(url) = cli.url.as_deref() {
            // "Download" config - we have server URL
            config_data = Some(Config {
                supabase_url: url.to_string(), //FIXME: this is incorrect, we are saving url to supabase
            }); //but instead we should be saving Server url from where we would download config including supabase url.

            // Try save config
            match config::save_config(config_data.clone().expect("Tried to download config and we don't have local one, exiting.")).await {
                Ok(_) => (),
                Err(_) => eprintln!("Can't save config file (are you root?), continuing running with config in memory."),
            };
        }
    }

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
