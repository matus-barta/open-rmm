use axum::response::Html;
use axum::{routing::get, Router};

mod healthcheck;

pub fn routes() -> Router {
    Router::new()
        .route(
            "/",
            get(|| async { Html("<h1>❤️ Hello from Open RMM API server! ❤️</h1>") }),
        )
        .route("/healthcheck", get(healthcheck::healthcheck))
}
