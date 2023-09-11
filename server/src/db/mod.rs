use sqlx::{postgres::PgPoolOptions, Error, Pool, Postgres};

mod system_info;

pub async fn create_pool_connection(database_url: String) -> Result<Pool<Postgres>, Error> {
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}
