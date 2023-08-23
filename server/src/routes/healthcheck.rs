use axum::response::{IntoResponse, Json, Response};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Healthcheck {
    status: String,
}

pub async fn healthcheck() -> Response {
    let healthcheck = Healthcheck {
        status: String::from("OK"),
    };

    Json(healthcheck).into_response()
}
