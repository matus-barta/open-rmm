use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub url: String,
}

pub async fn load_config() -> std::io::Result<Config> {
    let config_b = async_fs::read("config.json").await?;
    let config: Config = serde_json::from_slice(&config_b)?;

    Ok(config)
}
