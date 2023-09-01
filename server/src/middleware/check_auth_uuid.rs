use axum::{http::Request, middleware::Next, response::Response};

pub async fn check_auth_uuid<B>(req: Request<B>, next: Next<B>) -> Result<Response> {
    let uuid = req.headers().get("Device-UUID").ok_or(err)

    Ok(next.run(req).await)
}
