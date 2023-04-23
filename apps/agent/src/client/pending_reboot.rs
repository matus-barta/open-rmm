pub fn is_reboot_pending() -> bool {
    #[cfg(target_os = "macos")]
    {
        /*
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
        */
        return false; //FIXME: look at this in future for now macos in not critical to reboot, and does not have standard check for reboot
    }

    #[cfg(target_os = "windows")]
    {
        let pending_reboot_pwsh = include_str!("../scripts/pwsh/pending_reboot.ps1");
        match powershell_script::run(pending_reboot_pwsh) {
            Ok(output) => {
                let result = match &output.to_string() as &str {
                    "True" => true,
                    "true" => true,
                    "False" => false,
                    "false" => false,
                    _ => false,
                };

                return result;
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
        return false;
    }

    #[cfg(target_os = "linux")]
    {
        let pending_reboot_sh = include_str!("../scripts/bash/pending_reboot.sh");

        let (_code, output, _error) = run_script::run_script!(pending_reboot_sh).unwrap();

        let result = match &output.to_string() as &str {
            "True" => true,
            "true" => true,
            "False" => false,
            "false" => false,
            _ => false,
        };

        return result;
    }
}
