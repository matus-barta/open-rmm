use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

/// Dynamic config for storing Agent's configuration
///
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Config {
    /// url to supabase
    pub supabase_url: String,
}

pub async fn handle_config(url: Option<String>) -> Option<Config> {
    // Move all this config handling to Config
    // check for local copy then check if online is newer
    // if newer - download - if unable to save just return downloaded
    // if not local - download
    // if local newest load local
    // return config

    let mut config_data = None;

    if config_exists() {
        config_data = Some(
            load_config()
                .await
                .expect("Unable to load local config file."),
        );
    } else {
        if let Some(url) = url.as_deref() {
            // "Download" config - we have server URL
            config_data = Some(Config {
                supabase_url: url.to_string(), //FIXME: this is incorrect, we are saving url to supabase
            }); //but instead we should be saving Server url from where we would download config including supabase url.

            match save_config(
                config_data
                    .clone()
                    .expect("Tried to download config and we don't have local one, exiting."),
            )
            .await
            {
                Ok(_) => (),
                Err(_) => eprintln!("Can't save config. Continuing in memory config"),
            }
        }
    }

    config_data
}

fn get_config_path() -> PathBuf {
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    const CONFIG_PATH: &str = "/etc/openrmm-agent/config.json";
    #[cfg(target_os = "windows")]
    const CONFIG_PATH: &str = "/openrmm-agent/config.json";

    #[cfg(target_os = "windows")]
    Ok(Path::new(
        &std::env::var("PROGRAMDATA").expect("No PROGRAM DATA directory") + CONFIG_PATH,
    ));
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    Path::new(CONFIG_PATH).to_path_buf()
}

async fn load_config() -> std::io::Result<Config> {
    println!("Loading config.");
    let config_b = async_fs::read(get_config_path()).await?;
    let config: Config = serde_json::from_slice(&config_b)?;

    Ok(config)
}

async fn save_config(config: Config) -> std::io::Result<Config> {
    let path = get_config_path();

    println!("Saving config.");
    let config_json = serde_json::to_string(&config)?;

    match &path.parent() {
        Some(parent) => {
            async_fs::create_dir_all(parent).await?;
            async_fs::write(path, config_json).await?;
            Ok(config)
        }
        None => panic!("Wrong config path, can't get parent path"),
    }
}

fn config_exists() -> bool {
    get_config_path()
        .try_exists()
        .expect("File IO error checking config")
}
