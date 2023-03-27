use std::process::{Command, Stdio};

pub fn is_reboot_pending() -> bool {
    #[cfg(target_os = "macos")]
    {
        let output = Command::new("softwareupdate")
            //.arg("Hello world")
            //.arg("/Library/Updates/index.plist")
            //.arg("InstallAtLogout")
            //.stdout(Stdio::piped())
            .spawn()
            .expect("command failed to start");

        match output.wait_with_output() {
            Ok(output) => println!(
                "stdout: {} naaah",
                String::from_utf8_lossy(output.stdout.as_slice())
            ),
            Err(e) => {
                println!("{}", e.to_string());
                return false;
            }
        }

        return false;
    }
}
