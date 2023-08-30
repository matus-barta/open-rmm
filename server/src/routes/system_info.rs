use axum::response::{IntoResponse, Json, Response};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SystemInfoSchema {
    uuid: String,
    pending_reboot: String, //bool
    computer_name: String,
    last_boot_up_time: String, //iso date
    os_version: String,
    os_name: String,
    kernel_version: String,
    machine_type: String, //Physical, VM, LXC
}

pub async fn update_system_info(Json(body): Json<SystemInfoSchema>) -> Response {
    todo!()
}
