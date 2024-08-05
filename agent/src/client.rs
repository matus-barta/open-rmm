use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use sysinfo::System;

use postgrest::Postgrest;

use crate::config::Config;

mod detect_system_type;
mod device_uuid;
mod os_version_name;
mod pending_reboot;
mod utils;

pub struct Client {
    pub config: Config,
}

#[derive(Debug, Serialize, Deserialize)]
struct UuidResponse {
    uuid: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SystemInfo {
    computer_uuid: String,
    pending_reboot: bool,
    computer_name: String,
    last_bootup_time: String,
    //uptime: String,
    os_version: String,
    os_name: String,
    kernel_version: String,
    machine_type: String,
}

impl Client {
    pub async fn register_computer(&self, otk: String) -> Result<(), Box<dyn std::error::Error>> {
        let mut map = HashMap::new();
        map.insert("one_time_key", otk);

        let res_json = send_post_req_to_api(
            &map,
            self.config.supabase_url.clone() + "/functions/v1/register-computer",
        )
        .await?;

        device_uuid::save_uuid(res_json.uuid.to_string()).await?;

        println!("Got UUID: {:#?}", res_json.uuid);

        Ok(())
    }

    pub async fn report_system_info(&self) -> Result<(), Box<dyn std::error::Error>> {
        let system_info = build_system_info().await;

        let json = format!("[{}]", serde_json::to_string(&system_info)?);
        //println!("{}", json);

        let supabase_client = Postgrest::new(self.config.supabase_url.clone() + "/rest/v1")
        .insert_header("user-agent", "postgrest-rs")
        .insert_header("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0")
        .insert_header("Device-UUID", &system_info.computer_uuid);

        let res = supabase_client
            .from("system_info")
            .upsert(json)
            .execute()
            .await?;

        if !res.status().is_client_error() {
            println!("Sent System info report")
        } else {
            println!("LOG this error somewhere: {}", res.text().await?)
        }

        Ok(())
    }
}

async fn build_system_info() -> SystemInfo {
    let mut sys = System::new_all();
    sys.refresh_all();

    return SystemInfo {
        computer_uuid: device_uuid::load_uuid()
            .await
            .expect("UUID is missing, did you register this device?"),
        pending_reboot: pending_reboot::is_reboot_pending(),
        computer_name: sysinfo::System::host_name().unwrap_or_else(|| "<unknown>".to_owned()),
        last_bootup_time: utils::convert_unix_timestamp_to_iso(sysinfo::System::boot_time()),
        //uptime: sysinfo::System::uptime().to_string(), TODO: add this value in future
        os_version: sysinfo::System::os_version().unwrap_or_else(|| "<unknown>".to_owned()),
        os_name: os_version_name::process_os_name(
            sysinfo::System::long_os_version(),
            sysinfo::System::os_version(),
        ),
        kernel_version: sysinfo::System::kernel_version().unwrap_or_else(|| "<unknown>".to_owned()),
        machine_type: detect_system_type::detect_system_type().to_string(),
    };
}

async fn send_post_req_to_api(
    map: &HashMap<&str, String>,
    url: String,
) -> Result<UuidResponse, reqwest::Error> {
    let api_client = reqwest::Client::new();

    let res_json = api_client
        .post(url)
        .json(&map)
        .send()
        .await?
        .json::<UuidResponse>()
        .await?;
    Ok(res_json)
}
