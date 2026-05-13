use serde::{Deserialize, Serialize};
use sysinfo::System;

use crate::utils;

use super::device_uuid;

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

async fn build_system_info_with_uuid(uuid: uuid::Uuid) -> SystemInfo {
    let mut sys = System::new_all();
    sys.refresh_all();

    return SystemInfo {
        computer_uuid: uuid.to_string(),
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

pub async fn build_system_info() -> SystemInfo {
    let uuid = device_uuid::load_uuid()
        .await
        .expect("UUID is missing, did you register this device?");

    build_system_info_with_uuid(uuid).await
}

#[cfg(test)]
mod tests {
    use crate::client::device_uuid::save_uuid_with_path;
    use std::path::Path;

    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    /// Test if we can successfully build System_Info.
    #[tokio::test]
    async fn test_build_system_info() -> anyhow::Result<()> {
        let uuid_test_path = Path::new("system_info_uuid.test").to_path_buf();
        let uuid = uuid::Uuid::new_v4();

        save_uuid_with_path(uuid, uuid_test_path.clone()).await?;
        build_system_info_with_uuid(uuid).await;
        async_fs::remove_file(uuid_test_path).await?;

        Ok(())
    }
}
