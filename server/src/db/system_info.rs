/*
#[derive(sqlx::Type, Debug, Serialize, Deserialize)]
#[sqlx(type_name = "MachineType")]
pub enum MachineType {
    LXC,
    VM,
    Physical,
    Unknown,
}

#[derive(Debug, FromRow, Serialize)]
pub struct SystemInfo {
    pub Id: i32,
    pub ComputerUuid: uuid::Uuid,
    pub CreatedAt: chrono::DateTime<chrono::Utc>,
    pub UpdatedAt: chrono::DateTime<chrono::Utc>,
    pub PendingReboot: Option<bool>,
    pub MachineType: MachineType,
    pub LastBootupTime: chrono::DateTime<chrono::Utc>,
    pub ComputerName: String,
    pub OsVersion: String,
    pub OsName: String,
    pub KernelVersion: String,
}

pub async fn sql_test() -> Option<SystemInfo> {
    //  https://github.com/launchbadge/sqlx/issues/1004#issuecomment-764921020
    let result = sqlx::query_as(
        r#"SELECT "Id", "ComputerUuid", "CreatedAt", "UpdatedAt", "PendingReboot", "MachineType", "LastBootupTime", "ComputerName", "OsVersion", "OsName", "KernelVersion" FROM "SystemInfo""#,
    ).fetch_one(&PG_POOL.lock().unwrap().clone()).await; //https://morestina.net/blog/1774/rust-global-variables-demystified

    match result {
        Ok(res) => Some(res),
        Err(_) => None,
    }
}*/
