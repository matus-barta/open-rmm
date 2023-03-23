use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
struct UuidResponse {
    #[serde(alias = "Uuid")]
    uuid: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let uuid = Uuid::new_v4();
    let client = reqwest::Client::new();

    let mut map = HashMap::new();
    map.insert("UUID", uuid.to_string());
    map.insert(
        "OneTimeKey",
        "xiXnrDbYSXINR_nSC-wVphED5oE_bQYJPHjQU17lsjriZlOAgC1p94M3qF89CPt-".to_string(),
    );

    let res_json = client
        .post("http://localhost:5005/computer")
        .json(&map)
        .send()
        .await?
        .json::<UuidResponse>()
        .await?;

    println!("{:#?}", res_json);

    Ok(())
}
