use sqlx::{postgres::PgPoolOptions, types::chrono, FromRow, Pool, Postgres};
use wasm_bindgen::prelude::wasm_bindgen;

#[macro_use]
extern crate lazy_static;

lazy_static! {
    static ref PG_POOL: Pool<Postgres> = tokio::runtime::Runtime::new()
        .expect("Unable to create a runtime")
        .block_on(create_pool_connection("".to_string()));
}

#[wasm_bindgen]
pub fn greet(str: &str) -> String {
    format!("Hello, {}!", str)
}

#[derive(Debug)]
pub enum MachineType {
    LXC,
    VM,
    Physical,
    Unknown,
}

#[derive(Debug, FromRow)]
pub struct SystemInfo {
    pub Id: i32,
    pub ComputerUuid: uuid::Uuid,
    pub CreatedAt: chrono::DateTime<chrono::Utc>,
    pub UpdatedAt: chrono::DateTime<chrono::Utc>,
    pub PendingReboot: Option<bool>,
    pub Type: MachineType,
    pub LastBootupTime: chrono::DateTime<chrono::Utc>,
    pub ComputerName: String,
    pub OsVersion: String,
    pub OsName: String,
    pub KernelVersion: String,
}

#[wasm_bindgen]
pub fn sql_test() -> () {
    sqlx::query_as!(SystemInfo, "SELECT * FROM \"SystemInfo\"");
}

async fn create_pool_connection(database_url: String) -> Pool<Postgres> {
    let pool_connection = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await;

    return match pool_connection {
        Ok(pool) => pool,
        Err(err) => panic!("Connection failure: {:?}", err),
    };
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {}
}
