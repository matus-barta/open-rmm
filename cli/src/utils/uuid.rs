use uuid::Uuid;

use crate::error::AppError;

pub fn parse_from_str(uuid_s: &str) -> Result<Uuid, AppError> {
    Uuid::parse_str(&uuid_s)
        .map_err(|_| AppError::Input("Invalid uuid / cant parse uuid string".into()))
}
