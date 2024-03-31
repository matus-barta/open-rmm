use axum::response::Html;
use axum::routing::post;
use axum::{routing::get, Router};

mod computer;
mod healthcheck;
mod system_info;

pub fn routes() -> Router {
    Router::new()
        //-----------------------WEB API ENDPOINTS---------------------//
        .route(
            "/",
            get(|| async { Html("<h1>❤️ Hello from Open RMM API server! ❤️</h1>") }),
        )
        .route("/healthcheck", get(healthcheck::healthcheck))
        .route("/computer", post(computer::add_computer))
        .route(
            "/systeminfo/:computer_uuid",
            get(system_info::get_system_info),
        )
        .route("/systeminfo", get(system_info::list_system_info))
        //-----------------------AGENT API ENDPOINTS-------------------//
        .route("/systeminfo", post(system_info::update_system_info))
    //need to add checkUUID for this request ^^^^
}
