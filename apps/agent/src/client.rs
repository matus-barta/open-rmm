use chrono::{DateTime, NaiveDateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use sysinfo::{System, SystemExt};
use uuid::Uuid;

use crate::config::Config;
use crate::device_uuid;

mod pending_reboot;

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

        let client = reqwest::Client::new();

        let mut map = HashMap::new();
        map.insert("UUID", uuid.to_string());
        map.insert("OneTimeKey", otk);

        let res_json = client
            .post(self.config.url.clone() + "/computer")
            .json(&map)
            .send()
            .await?
            .json::<UuidResponse>()
            .await?;

        println!("{:#?}", res_json);

        Ok(())
    }

    pub async fn report_system_info(&self) -> Result<(), Box<dyn std::error::Error>> {
        let mut sys = System::new_all();
        sys.refresh_all();

        let mut map = HashMap::new();

        map.insert("UUID", device_uuid::load_uuid().await?);
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
            convert_unix_timestamp_to_iso(sys.boot_time()),
        );
        map.insert("Uptime", sys.uptime().to_string());
        map.insert(
            "OsVersion",
            sys.os_version().unwrap_or_else(|| "<unknown>".to_owned()),
        );
        map.insert(
            "OsName",
            process_os_name(sys.long_os_version(), sys.os_version()),
        );
        map.insert(
            "KernelVersion",
            sys.kernel_version()
                .unwrap_or_else(|| "<unknown>".to_owned()),
        );
        map.insert("Type", "<unknown>".to_owned()); //TODO:

        println!(
            "{}",
            process_os_name(sys.long_os_version(), sys.os_version())
        );
        Ok(())
    }
}

fn get_macos_version_name(major: u64, minor: u64) -> String {
    match major {
        13 => "Ventura".to_string(),
        12 => "Monterey".to_string(),
        11 => "Big Sur".to_string(),
        10 => match minor {
            15 => "Catalina".to_string(),
            14 => "Mojave".to_string(),
            13 => "High Sierra".to_string(),
            12 => "Sierra".to_string(),
            11 => "El Capitan".to_string(),
            10 => "Yosemite".to_string(),
            9 => "Mavericks".to_string(),
            8 => "Mountain Lion".to_string(),
            7 => "Lion".to_string(),
            6 => "Snow Leopard".to_string(),
            5 => "Leopard".to_string(),
            4 => "Tiger".to_string(),
            3 => "Panther".to_string(),
            2 => "Jaguar".to_string(),
            1 => "Puma".to_string(),
            0 => "Cheetah".to_string(),
            _ => "<unknown>".to_string(),
        },
        _ => "<unknown>".to_string(),
    }
}

fn process_os_name(long_os_version: Option<String>, os_version: Option<String>) -> String {
    let os_name = long_os_version.unwrap_or_else(|| "<unknown>".to_owned()); //MacOS 13.2.1

    let sys_os_ver = os_version.unwrap_or_else(|| "<unknown>".to_owned()); //13.2.1
    let version = parse_version(&sys_os_ver).unwrap_or_else(|| (0, 0, 0)); //13.2.1
    let codename = get_macos_version_name(version.0, version.1); //Ventura

    if os_name.contains("MacOS") {
        format!("{}{}", os_name, codename)
    } else {
        os_name
    }
}

fn parse_version(s: &str) -> Option<(u64, u64, u64)> {
    let mut iter = s.trim().split_terminator('.').fuse();

    let major = iter.next().and_then(|s| s.parse().ok())?;
    let minor = iter.next().unwrap_or("0").parse().ok()?;
    let patch = iter.next().unwrap_or("0").parse().ok()?;

    if iter.next().is_some() {
        return None;
    }

    Some((major, minor, patch))
}

fn convert_unix_timestamp_to_iso(timestamp: u64) -> String {
    let naive_date_time =
        NaiveDateTime::from_timestamp_millis(timestamp as i64).unwrap_or_default();
    let date_time = DateTime::<Utc>::from_utc(naive_date_time, Utc);
    return date_time.to_rfc3339();
}
