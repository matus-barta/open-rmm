use axum::Extension;
use dotenv::dotenv;
use sqlx::PgPool;
use std::net::SocketAddr;
use tower_http::trace::TraceLayer;

use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

mod db;
mod middleware;
mod routes;

#[derive(Clone)]
pub struct AppState {
    db_pool: PgPool,
}

#[tokio::main]
async fn main() {
    dotenv().ok(); // This line loads the environment variables from the ".env" file.

    let log = std::env::var("LOG_LEVEL").expect("LOG_LEVEL must be set.");
    println!("...Log level: {}", log);

    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(EnvFilter::from_env("LOG_LEVEL"))
        .init();

    tracing::info!("Tracing... ✅");

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    tracing::debug!("DB ENV loaded - {}", database_url);

    let db_pool = db::create_pool_connection(database_url)
        .await
        .expect("Unable to connect to DB");
    tracing::info!("Connected to DB... ✅");

    let routes = routes::routes()
        .layer(Extension(AppState { db_pool }))
        .layer(TraceLayer::new_for_http());
    tracing::info!("Routes Loaded... ✅");

    let addr = SocketAddr::from(([127, 0, 0, 1], 5005));
    tracing::info!("Server Running... ✅");
    tracing::debug!("➡️ at http://{addr}/");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, routes.into_make_service())
        .await
        .unwrap();
}
