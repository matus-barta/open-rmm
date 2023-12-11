use axum::extract::Path;
use axum::response::Json;
use axum::Extension;
use serde::{Deserialize, Serialize};

use crate::routes::Result;
use crate::AppState;

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

pub async fn update_system_info(
    app_state: Extension<AppState>,
) -> Result<Json<crate::db::system_info::SystemInfo>> {
    let result = crate::db::system_info::update_system_info(&app_state.db_pool).await?;
    Ok(Json(result))
}

pub async fn get_system_info(
    app_state: Extension<AppState>,
    Path(computer_uuid): Path<uuid::Uuid>,
) -> Result<Json<crate::db::system_info::SystemInfo>> {
    let result = crate::db::system_info::get_system_info(&app_state.db_pool, computer_uuid).await?;
    Ok(Json(result))
}
