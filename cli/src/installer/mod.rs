use std::path::Path;
use std::{env, fs};

use crate::utils::check_for_admin_rights;

pub fn self_installer() -> Result<(), anyhow::Error> {
    if !check_for_admin_rights() {
        panic!("Install needs run as root/admin")
    }

    // prepare path of executable and install path
    let current_executable = env::current_exe().expect("failed to get current exe path");
    println!("Executable path -> {:?}", current_executable);

    #[cfg(any(target_os = "macos", target_os = "linux"))]
    let install_path = Path::new("/usr/local/bin/OpenRMM-Agent");

    #[cfg(target_os = "windows")]
    let install_path = Path::new(
        &std::env::var("PROGRAMFILES").expect("No PROGRAM FILES directory")
            + "/Open-RMM Agent/OpenRMM-Agent.exe",
    );
    println!("Install path -> {:?}", install_path);

    // create folders if needed
    fs::create_dir_all(&install_path)?;
    // copy itself to bin folder depending on os
    fs::copy(current_executable, install_path)?; //FIXME: Maybe handle overwriting?

    // setup path - not now

    // setup service/daemon

    // start services/daemon

    Ok(())
}
