use chrono::{DateTime, SecondsFormat, Utc};
use std::time::{Duration, UNIX_EPOCH};

#[cfg(any(target_os = "macos", target_os = "linux"))]
use nix::unistd::Uid;

pub mod paths;

pub fn convert_unix_timestamp_to_iso(timestamp: u64) -> String {
    let d = UNIX_EPOCH + Duration::from_secs(timestamp);

    let date_time = DateTime::<Utc>::from(d);
    return date_time.to_rfc3339_opts(SecondsFormat::Millis, true);
}

/// Returns `true` if root/admin
pub fn check_for_admin_rights() -> bool {
    #[cfg(any(target_os = "macos", target_os = "linux"))]
    return Uid::effective().is_root();

    #[cfg(windows)]
    return is_elevated();
}

#[cfg(windows)]
pub fn is_elevated() -> bool {
    use windows::Win32::Foundation::{CloseHandle, HANDLE};
    use windows::Win32::Security::{
        GetTokenInformation, TOKEN_ELEVATION, TOKEN_QUERY, TokenElevation,
    };
    use windows::Win32::System::Threading::{GetCurrentProcess, OpenProcessToken};

    unsafe {
        let mut token = HANDLE::default();

        if OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &mut token).is_err() {
            return false;
        }

        let mut elevation = TOKEN_ELEVATION::default();
        let mut returned = 0u32;

        let ok = GetTokenInformation(
            token,
            TokenElevation,
            Some(&mut elevation as *mut _ as *mut _),
            std::mem::size_of::<TOKEN_ELEVATION>() as u32,
            &mut returned,
        )
        .is_ok();

        let _ = CloseHandle(token);

        ok && elevation.TokenIsElevated != 0
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_unix_timestamp_to_iso() {
        let timedate = convert_unix_timestamp_to_iso(1730467844);

        assert_eq!(timedate, "2024-11-01T13:30:44.000Z")
    }

    #[test]
    /// May be return false-positive errors, depends on environment
    fn test_check_for_admin_rights() {
        assert_eq!(check_for_admin_rights(), false)
    }
}
