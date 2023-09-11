use axum::response::{IntoResponse, Json, Response};
use axum::Extension;
use serde::{Deserialize, Serialize};

use crate::routes::{Error, Result};
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

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Test {
    Id: i32,
}

pub async fn update_system_info(app_state: Extension<AppState>) -> Result<Json<Test>> {
    let result = sqlx::query_as::<_, Test>(r#"SELECT "Id" FROM "Computer""#)
        .fetch_one(&app_state.db_pool)
        .await?;

    Ok(Json(result))
}
