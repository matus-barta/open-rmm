use std::env;

use crate::utils::check_for_admin_rights;
use crate::utils::paths::get_install_file_path;

pub async fn self_installer() -> Result<(), anyhow::Error> {
    if !check_for_admin_rights() {
        panic!("Install needs run as root/admin")
    }

    // prepare path of executable and install path
    let current_executable = env::current_exe().expect("failed to get current exe path");
    println!("Executable path -> {:?}", current_executable);

    let install_path = get_install_file_path();
    println!("Install path -> {:?}", install_path);

    // create folders if needed
    match &install_path.parent() {
        Some(parent) => {
            async_fs::create_dir_all(parent).await?;
        }
        None => panic!("Wrong config path, can't get parent path"),
    }

    // copy itself to bin folder depending on os
    async_fs::copy(current_executable, install_path).await?; //FIXME: Maybe handle overwriting?

    // setup path - not now

    // setup service/daemon

    // start services/daemon

    Ok(())
}
