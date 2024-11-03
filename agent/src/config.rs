use serde::{Deserialize, Serialize};

/// Config for storing Agent's configuration
///
#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    /// url to supabase
    pub supabase_url: String,
}

pub async fn load_config() -> std::io::Result<Config> {
    let config_b = async_fs::read("config.json").await?; //TODO:do not store config with binary
    let config: Config = serde_json::from_slice(&config_b)?;

    Ok(config)
}

pub async fn save_config(config: Config) -> std::io::Result<()> {
    let config_json = serde_json::to_string(&config)?;

    async_fs::write("config.json", config_json).await?; //TODO:do not store config with binary
    Ok(())
}
