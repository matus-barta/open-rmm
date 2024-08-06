use async_fs;
use std::str;

pub async fn save_uuid(uuid: String) -> std::io::Result<()> {
    Ok(save_uuid_with_name(uuid, "uuid".to_string()).await?)
}

async fn save_uuid_with_name(uuid: String, name: String) -> std::io::Result<()> {
    async_fs::write(name, uuid).await?;
    Ok(())
}

pub async fn load_uuid() -> Result<String, Box<dyn std::error::Error>> {
    Ok(load_uuid_with_name("uuid".to_string()).await?)
}

async fn load_uuid_with_name(name: String) -> Result<String, Box<dyn std::error::Error>> {
    let uuid_b = async_fs::read(name).await?;
    let uuid = str::from_utf8(&uuid_b)?.to_string();
    Ok(uuid)
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[tokio::test]
    async fn test_save_and_load_uuid() -> Result<(), Box<dyn std::error::Error>> {
        let uuid = uuid::Uuid::new_v4().to_string();

        let test_name = "uuid.test".to_string();

        save_uuid_with_name(uuid.clone(), test_name.clone()).await?;
        let loaded_uuid = load_uuid_with_name(test_name.clone()).await?;

        async_fs::remove_file(test_name).await?;

        assert_eq!(uuid, loaded_uuid);
        Ok(())
    }
}
