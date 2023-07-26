use axum::{response::IntoResponse, response::Response, routing::get, Json, Router};
use serde::Serialize;

pub fn routes() -> Router {
    Router::new().route("/healthcheck", get(healthcheck))
}

async fn healthcheck() -> Response {
    let healthcheck = Healthcheck {
        status: String::from("OK"),
    };

    Json(healthcheck).into_response()
}

#[derive(Serialize)]
struct Healthcheck {
    status: String,
}
