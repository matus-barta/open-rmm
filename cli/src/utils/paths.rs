use std::path::PathBuf;

pub fn get_config_path() -> PathBuf {
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    const CONFIG_PATH: &str = "/etc/openrmm-agent/config.json";
    #[cfg(target_os = "windows")]
    const CONFIG_PATH: &str = "/openrmm-agent/config.json";

    #[cfg(target_os = "windows")]
    Ok(Path::new(
        &std::env::var("PROGRAMDATA").expect("No PROGRAM DATA directory") + CONFIG_PATH,
    ));
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    Path::new(CONFIG_PATH).to_path_buf()
}
