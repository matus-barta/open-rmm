pub fn process_os_name(long_os_version: Option<String>, os_version: Option<String>) -> String {
    let os_name = long_os_version.unwrap_or_else(|| "<unknown>".to_owned()); //MacOS 13.2.1

    if os_name.contains("MacOS") {
        let sys_os_ver = os_version.unwrap_or_else(|| "<unknown>".to_owned()); //13.2.1
        let version = parse_version(&sys_os_ver).unwrap_or_else(|| (0, 0, 0)); //13.2.1
        let codename = get_macos_version_name(version.0, version.1); //Ventura

        format!("{}{}", os_name, codename)
    } else {
        os_name
    }
}

fn get_macos_version_name(major: u64, minor: u64) -> String {
    //https://en.wikipedia.org/wiki/MacOS_version_history#Releases
    match major {
        15 => "Sequoia".to_string(),
        14 => "Sonoma".to_string(),
        13 => "Ventura".to_string(),
        12 => "Monterey".to_string(),
        11 => "Big Sur".to_string(),
        10 => match minor {
            15 => "Catalina".to_string(),
            14 => "Mojave".to_string(),
            13 => "High Sierra".to_string(),
            12 => "Sierra".to_string(),
            11 => "El Capitan".to_string(),
            10 => "Yosemite".to_string(),
            9 => "Mavericks".to_string(),
            8 => "Mountain Lion".to_string(),
            7 => "Lion".to_string(),
            6 => "Snow Leopard".to_string(),
            5 => "Leopard".to_string(),
            4 => "Tiger".to_string(),
            3 => "Panther".to_string(),
            2 => "Jaguar".to_string(),
            1 => "Puma".to_string(),
            0 => "Cheetah".to_string(),
            _ => "<unknown>".to_string(),
        },
        _ => "<unknown>".to_string(),
    }
}

fn parse_version(s: &str) -> Option<(u64, u64, u64)> {
    let mut iter = s.trim().split_terminator('.').fuse();

    let major = iter.next().and_then(|s| s.parse().ok())?;
    let minor = iter.next().unwrap_or("0").parse().ok()?;
    let patch = iter.next().unwrap_or("0").parse().ok()?;

    if iter.next().is_some() {
        return None;
    }

    Some((major, minor, patch))
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_os_name() {
        let mut sys = sysinfo::System::new_all();
        sys.refresh_all();

        let os_name = process_os_name(
            sysinfo::System::long_os_version(),
            sysinfo::System::os_version(),
        );

        assert!(!os_name.contains("<unknown>"))
    }
}
