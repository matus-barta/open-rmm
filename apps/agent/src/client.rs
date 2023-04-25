use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use sysinfo::{System, SystemExt};
use uuid::Uuid;

use crate::config::Config;

mod detect_system_type;
mod device_uuid;
mod os_version_name;
mod pending_reboot;
mod utils;

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
        device_uuid::save_uuid(uuid.to_string()).await?;

        let mut map = HashMap::new();
        map.insert("UUID", uuid.to_string());
        map.insert("OneTimeKey", otk);

        let res_json =
            send_post_req_with_uuid_res(&map, self.config.url.clone() + "/computer", false).await?;
        println!("{:#?}", res_json);

        Ok(())
    }

    pub async fn report_system_info(&self) -> Result<(), Box<dyn std::error::Error>> {
        let mut map = HashMap::new();

        build_system_info(&mut map).await;

        let res_json =
            send_post_req_with_uuid_res(&map, self.config.url.clone() + "/systeminfo", true)
                .await?;

        println!("{:#?}", res_json);

        //TODO: send data to server

        Ok(())
    }
}

async fn build_system_info(map: &mut HashMap<&str, String>) {
    let mut sys = System::new_all();
    sys.refresh_all();

    map.insert(
        "UUID",
        device_uuid::load_uuid()
            .await
            .expect("UUID is missing, did you register this device?"),
    );
    map.insert(
        "PendingReboot",
        pending_reboot::is_reboot_pending().to_string(),
    );
    map.insert(
        "ComputerName",
        sys.host_name().unwrap_or_else(|| "<unknown>".to_owned()),
    );
    map.insert(
        "LastBootUpTime",
        utils::convert_unix_timestamp_to_iso(sys.boot_time()),
    );
    map.insert("Uptime", sys.uptime().to_string());
    map.insert(
        "OsVersion",
        sys.os_version().unwrap_or_else(|| "<unknown>".to_owned()),
    );
    map.insert(
        "OsName",
        os_version_name::process_os_name(sys.long_os_version(), sys.os_version()),
    );
    map.insert(
        "KernelVersion",
        sys.kernel_version()
            .unwrap_or_else(|| "<unknown>".to_owned()),
    );
    map.insert("Type", detect_system_type::detect_system_type().to_string());
}

async fn send_post_req_with_uuid_res(
    map: &HashMap<&str, String>,
    url: String,
    send_uuid_header: bool,
) -> Result<UuidResponse, reqwest::Error> {
    let client = reqwest::Client::new();

    if send_uuid_header {
        let res_json = client
            .post(url)
            .json(&map)
            .header("Device-UUID", map.get("UUID").expect("Missing UUID in map"))
            .send()
            .await?
            .json::<UuidResponse>()
            .await?;
        Ok(res_json)
    } else {
        let res_json = client
            .post(url)
            .json(&map)
            .send()
            .await?
            .json::<UuidResponse>()
            .await?;
        Ok(res_json)
    }
}
