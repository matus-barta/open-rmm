use async_fs;
use std::str;

pub async fn save_uuid(uuid: String) -> std::io::Result<()> {
    async_fs::write("uuid", uuid).await?;
    Ok(())
}

pub async fn load_uuid() -> Result<String, Box<dyn std::error::Error>> {
    let uuid_b = async_fs::read("uuid").await?;
    let uuid = str::from_utf8(&uuid_b)?.to_string();
    Ok(uuid)
}
