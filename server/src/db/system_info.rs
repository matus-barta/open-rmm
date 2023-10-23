use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Pool, Postgres};

use crate::routes::Result;

#[derive(sqlx::Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "MachineType")]
pub enum MachineType {
    LXC,
    VM,
    Physical,
    Unknown,
}

#[derive(Debug, FromRow, Serialize)]
#[serde(rename_all = "PascalCase")]
#[sqlx(rename_all = "PascalCase")]
pub struct SystemInfo {
    pub id: i32,
    pub computer_uuid: uuid::Uuid,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub pending_reboot: Option<bool>,
    pub machine_type: MachineType,
    pub last_bootup_time: chrono::DateTime<chrono::Utc>,
    pub computer_name: String,
    pub os_version: String,
    pub os_name: String,
    pub kernel_version: String,
}

pub async fn sql_test(db_pool: &Pool<Postgres>) -> Result<SystemInfo, sqlx::Error> {
    //  https://github.com/launchbadge/sqlx/issues/1004#issuecomment-764921020
    let result = sqlx::query_as::<Postgres, SystemInfo>(r#"SELECT * FROM "SystemInfo""#)
        .fetch_one(db_pool)
        .await?;
    Ok(result)
}
