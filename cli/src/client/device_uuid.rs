use async_fs;
use std::{path::PathBuf, str};
use uuid::Uuid;

use crate::utils::paths;

pub async fn save_uuid(uuid: Uuid) -> std::io::Result<()> {
    Ok(save_uuid_with_path(uuid, paths::get_uuid_file_path()).await?)
}

pub async fn save_uuid_with_path(uuid: Uuid, path: PathBuf) -> std::io::Result<()> {
    async_fs::write(path, uuid.to_string()).await?;
    Ok(())
}

pub async fn load_uuid() -> anyhow::Result<Uuid> {
    Ok(load_uuid_with_path(paths::get_uuid_file_path()).await?)
}

pub async fn load_uuid_with_path(path: PathBuf) -> anyhow::Result<Uuid> {
    let uuid_b = async_fs::read(path).await?;
    let uuid_s = str::from_utf8(&uuid_b)?.to_string();

    let uuid = Uuid::parse_str(&uuid_s)?;
    Ok(uuid)
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
