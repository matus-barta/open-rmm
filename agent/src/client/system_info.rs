use serde::{Deserialize, Serialize};
use sysinfo::System;

use super::device_uuid;
use super::utils;

mod detect_system_type;
mod os_version_name;
mod pending_reboot;

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    pub computer_uuid: String,
    pub pending_reboot: bool,
    pub computer_name: String,
    pub last_bootup_time: String,
    //uptime: String,
    pub os_version: String,
    pub os_name: String,
    pub kernel_version: String,
    pub machine_type: String,
}

pub async fn build_system_info() -> SystemInfo {
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

#[cfg(test)]
mod tests {
    use device_uuid::load_uuid;

    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    /// Test if we can successfully build System_Info.
    #[tokio::test]
    async fn test_build_system_info() -> Result<(), Box<dyn std::error::Error>> {
        let mut cleanup = false;

        match load_uuid().await {
            Ok(_) => {}
            Err(_) => {
                device_uuid::save_uuid(uuid::Uuid::new_v4().to_string()).await?;
                cleanup = true
            }
        }

        build_system_info().await;
        if cleanup {
            async_fs::remove_file("uuid".to_string()).await?;
        }

        Ok(())
    }
}
