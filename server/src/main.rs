use std::net::SocketAddr;

use axum::{response::Html, routing::get, Router};

mod routes;

#[tokio::main]
async fn main() {
    let routes = Router::new().route("/hello", get(|| async { Html("Hello") }));

    let addr = SocketAddr::from(([0, 0, 0, 0], 5005));
    println!(" Server is running at http://{addr}");

    axum::Server::bind(&addr)
        .serve(routes.into_make_service())
        .await
        .unwrap()
}
