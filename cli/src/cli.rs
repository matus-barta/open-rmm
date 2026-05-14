use std::path::PathBuf;

use clap::{Parser, Subcommand};

#[derive(Parser, Debug)]
#[command(version, about="Open-RMM CLI Agent", long_about = None, after_help="No arguments will run Agent to collect data.")]
pub struct Cli {
    /// Increase verbosity (-v, -vv, -vvv)
    #[arg(short, long, action = clap::ArgAction::Count)]
    pub verbose: u8,

    /// Silence console output (still writes to file logs unless --no-file-log)
    #[arg(long)]
    pub quiet: bool,

    /// Override directory where log files are written
    #[arg(long)]
    pub log_dir: Option<PathBuf>,

    /// Disable file logging (console/journald only)
    #[arg(long)]
    pub no_file_log: bool,

    /// URL to server (from where it will download config) - if config exists, will ignore this value (won't override url in config)
    #[arg(short, long, default_value = "http://127.0.0.1:54321")]
    pub url: String,

    #[command(subcommand)]
    pub command: Option<Commands>,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    /// Install as daemon/service, run together or after registering the computer
    Install,
    /// Register the computer with OTK
    Register {
        /// Generated One Time Key to register computer in Open-RMM (64 characters)
        #[arg(short, long)]
        otk: String,
    },
    /// Remove as daemon/service, to remove from Open-RMM use Dashboard
    Remove,
    /// Don't exit run on internal timer
    Background,
}
