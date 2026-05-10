use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

/// Dynamic config for storing Agent's configuration
///
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Config {
    /// url to supabase
    pub supabase_url: String,
}

#[cfg(any(target_os = "macos", target_os = "linux"))]
const CONFIG_PATH: &str = "/etc/openrmm-agent/config.json";
#[cfg(target_os = "windows")]
const CONFIG_PATH: &str = "/openrmm-agent/config.json";

fn get_config_path() -> PathBuf {
    #[cfg(target_os = "windows")]
    Ok(Path::new(
        &std::env::var("PROGRAMDATA").expect("No PROGRAM DATA directory") + CONFIG_PATH,
    ));
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    Path::new(CONFIG_PATH).to_path_buf()
}

pub async fn load_config() -> std::io::Result<Config> {
    println!("Loading config.");
    let config_b = async_fs::read(get_config_path()).await?; //TODO:do not store config with binary
    let config: Config = serde_json::from_slice(&config_b)?;

    Ok(config)
}

pub async fn save_config(config: Config) -> std::io::Result<Config> {
    let path = get_config_path();

    println!("Saving config.");
    let config_json = serde_json::to_string(&config)?;

    async_fs::create_dir_all(&path).await?;
    async_fs::write(path, config_json).await?; //TODO:do not store config with binary
    Ok(config)
}

pub fn config_exists() -> bool {
    get_config_path()
        .try_exists()
        .expect("File IO error checking config")
}
