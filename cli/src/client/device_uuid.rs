use async_fs;
use std::{path::PathBuf, str};
use uuid::Uuid;

use crate::{
    error::AppError,
    utils::{paths, uuid::parse_from_str},
};

pub async fn save_uuid(uuid: Uuid) -> Result<(), AppError> {
    Ok(save_uuid_with_path(uuid, paths::get_uuid_file_path()).await?)
}

pub async fn save_uuid_with_path(uuid: Uuid, path: PathBuf) -> Result<(), AppError> {
    async_fs::write(path, uuid.to_string())
        .await
        .map_err(|e| AppError::Io {
            context: "Cant save uuid file.",
            source: e,
        })?;
    Ok(())
}

pub async fn load_uuid() -> Result<Uuid, AppError> {
    Ok(load_uuid_with_path(paths::get_uuid_file_path()).await?)
}

pub async fn load_uuid_with_path(path: PathBuf) -> Result<Uuid, AppError> {
    let uuid_b = async_fs::read(path).await.map_err(|e| AppError::Io {
        context: "Cant read uuid file",
        source: e,
    })?;
    let uuid_s = str::from_utf8(&uuid_b)
        .map_err(|_| AppError::Parse("Cant parse string to UTF-8".into()))?;

    parse_from_str(uuid_s)
}

#[cfg(test)]
mod tests {
    use std::path::Path;

    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    /// Test that we can save an load UUID correctly, check if they are matching.
    #[tokio::test]
    async fn test_save_and_load_uuid() -> anyhow::Result<()> {
        let uuid = uuid::Uuid::new_v4();

        let path = Path::new("save_load_uuid.test").to_path_buf();

        save_uuid_with_path(uuid.clone(), path.clone()).await?;
        let loaded_uuid = load_uuid_with_path(path.clone()).await?;

        async_fs::remove_file(path).await?;

        assert_eq!(uuid, loaded_uuid);
        Ok(())
    }
}
