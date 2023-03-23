use serde::{Deserialize, Serialize};
use std::{collections::HashMap, env};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
struct UuidResponse {
    #[serde(alias = "Uuid")]
    uuid: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        if args[1].contains("--otk=") {
            let otk: Vec<_> = args[1].split('=').collect();
            if otk[1].len() == 64 {
                register_computer(otk[1].to_string()).await?;
            } else {
                println!("One Time key has to be 64 characters long!")
            }
        } else {
            usage_message()
        }
    } else if args.len() == 1 {
        // do collection stuff
        println!("collect stuff")
    } else {
        usage_message()
    }

    Ok(())
}

async fn register_computer(otk: String) -> Result<(), Box<dyn std::error::Error>> {
    let uuid = Uuid::new_v4();
    save_uuid(uuid.to_string())?;

    let client = reqwest::Client::new();

    let mut map = HashMap::new();
    map.insert("UUID", uuid.to_string());
    map.insert("OneTimeKey", otk);

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

fn usage_message() {
    println!("Usage:\n
            - no arguments: run agent to collect data\n
            - \"--otk=<64 characters of generated One Time Key>: (without <>) will add computer to RMM\"");
}

fn save_uuid(uuid: String) -> std::io::Result<()> {
    std::fs::write("uuid", uuid)?;
    Ok(())
}
