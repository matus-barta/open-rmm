use serde::{Deserialize, Serialize};

use crate::{error::AppError, utils::paths::get_config_file_path};

/// Dynamic config for storing Agent's configuration
///
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Config {
    /// url to supabase
    pub supabase_url: String,
}

pub async fn handle_config(url: String) -> Result<Config, AppError> {
    // Move all this config handling to Config
    // check for local copy then check if online is newer
    // if newer - download - if unable to save just return downloaded
    // if not local - download
    // if local newest load local
    // return config

    let config_exists = get_config_file_path()
        .try_exists()
        .map_err(|e| AppError::Io {
            context: "File IO error checking config",
            source: e,
        })?;

    if config_exists {
        load_config().await
    } else {
        // "Download" config - we have server URL
        let config_data = Config {
            supabase_url: url, //FIXME: this is incorrect, we are saving url to supabase
        }; //but instead we should be saving Server url from where we would download config including supabase url.

        save_config(config_data.clone()).await
    }
}

pub async fn load_config() -> Result<Config, AppError> {
    tracing::info!("Loading config.");

    let config_b = async_fs::read(get_config_file_path())
        .await
        .map_err(|e| AppError::Io {
            context: "Cant read config file",
            source: e,
        })?;
    let config: Config = serde_json::from_slice(&config_b)
        .map_err(|_| AppError::Config("cant load stored config".into()))?;

    Ok(config)
}

async fn save_config(config: Config) -> Result<Config, AppError> {
    tracing::info!("Saving config.");
    let path = get_config_file_path();

    let config_json = serde_json::to_string(&config)
        .map_err(|_| AppError::Config("cant stringify provided config to save it".into()))?;

    let parent = &path
        .parent()
        .ok_or_else(|| AppError::Input("Wrong config path, can't get parent path".into()))?;

    async_fs::create_dir_all(parent)
        .await
        .map_err(|e| AppError::Io {
            context: "Cant create path to config. Are you root?",
            source: e,
        })?;

    async_fs::write(path, config_json)
        .await
        .map_err(|e| AppError::Io {
            context: "Cant save config file. Are you root?",
            source: e,
        })?;

    Ok(config)
}
