use async_fs;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;

use crate::config::Config;

pub struct Client {
    pub config: Config,
}

#[derive(Serialize, Deserialize, Debug)]
struct UuidResponse {
    #[serde(alias = "Uuid")]
    uuid: String,
}

impl Client {
    pub async fn register_computer(&self, otk: String) -> Result<(), Box<dyn std::error::Error>> {
        let uuid = Uuid::new_v4();
        save_uuid(uuid.to_string()).await?;

        let client = reqwest::Client::new();

        let mut map = HashMap::new();
        map.insert("UUID", uuid.to_string());
        map.insert("OneTimeKey", otk);

        let res_json = client
            .post(self.config.url.clone())
            .json(&map)
            .send()
            .await?
            .json::<UuidResponse>()
            .await?;

        println!("{:#?}", res_json);

        Ok(())
    }

    pub async fn report_system_info(&self) -> Result<(), Box<dyn std::error::Error>> {
        Ok(())
    }
}

async fn save_uuid(uuid: String) -> std::io::Result<()> {
    async_fs::write("uuid", uuid).await?;
    Ok(())
}
