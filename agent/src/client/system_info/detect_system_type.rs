use std::fmt;

#[allow(dead_code)]
pub enum SystemType {
    VM,
    Physical,
    LXC,
    Unknown,
}

impl fmt::Display for SystemType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            SystemType::LXC => write!(f, "LXC"),
            SystemType::VM => write!(f, "VM"),
            SystemType::Physical => write!(f, "Physical"),
            SystemType::Unknown => write!(f, "Unknown"),
        }
    }
}

pub fn detect_system_type() -> SystemType {
    #[cfg(target_os = "linux")]
    {
        let (_code, output, _error) = run_script::run_script!("systemd-detect-virt").unwrap();

        let clean_out: String = output.chars().filter(|c| !c.is_whitespace()).collect();

        let result = match &clean_out.to_string().to_lowercase() as &str {
            "lxc" => SystemType::LXC,
            "kvm" => SystemType::VM,
            "none" => SystemType::Physical,
            _ => SystemType::Unknown,
        };

        return result;
    }

    #[cfg(target_os = "windows")]
    {
        let detect_vm_pwsh = include_str!("../scripts/pwsh/detect_vm.ps1");
        match powershell_script::run(detect_vm_pwsh) {
            Ok(output) => {
                let clean_out: String = output
                    .to_string()
                    .chars()
                    .filter(|c| !c.is_whitespace())
                    .collect();

                let result = match &&clean_out.to_string().to_lowercase() as &str {
                    "vmware" => SystemType::VM,
                    "virtualbox" => SystemType::VM,
                    "xen" => SystemType::VM,
                    "kvm" => SystemType::VM,
                    "azure" => SystemType::VM,
                    "hyper-v" => SystemType::VM,
                    "googlecloud" => SystemType::VM,
                    "aws" => SystemType::VM,
                    "physical" => SystemType::Physical,
                    _ => SystemType::Unknown,
                };

                return result;
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
        return SystemType::Unknown;
    }

    #[cfg(target_os = "macos")]
    {
        //https://stackoverflow.com/questions/28529633/how-to-detect-if-mac-os-x-is-being-run-inside-a-virtual-machine
        return SystemType::Physical; //FIXME: ioreg -l | grep -e Manufacturer -e 'Vendor Name' - Searching for VirtualBox, Oracle, VMware and Parallels in the output
    }
}
