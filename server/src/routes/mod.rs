use axum::response::Html;
use axum::routing::post;
use axum::{routing::get, Router};

mod computer;
mod error;
mod healthcheck;
mod system_info;

pub use error::{Error, ResultExt};

pub type Result<T, E = Error> = std::result::Result<T, E>;

pub fn routes() -> Router {
    Router::new()
        .route(
            "/",
            get(|| async { Html("<h1>❤️ Hello from Open RMM API server! ❤️</h1>") }),
        )
        .route("/healthcheck", get(healthcheck::healthcheck))
        .route("/computer", post(computer::add_computer))
        .route("/systeminfo", get(system_info::update_system_info))
    //need to add checkUUID for this request ^^^^
}
