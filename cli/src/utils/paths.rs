use std::{ffi::OsString, path::PathBuf};

#[derive(Copy, Clone)]
enum Root {
    /// A Unix absolute directory path like "/etc/openrmm-agent"
    #[allow(dead_code)]
    UnixAbs(&'static str),
    /// A Windows-relative directory path under an environment variable
    #[allow(dead_code)]
    WinEnv {
        env: &'static str,
        rel: &'static str,
    },
}

fn resolve(root: Root, file: &'static str) -> PathBuf {
    resolve_dir(root).join(file)
}

fn resolve_dir(root: Root) -> PathBuf {
    if cfg!(debug_assertions) {
        PathBuf::new()
    } else {
        resolve_dir_with(root, |k| std::env::var_os(k))
    }
}

fn resolve_dir_with<F>(root: Root, get_env: F) -> PathBuf
where
    F: Fn(&str) -> Option<OsString>,
{
    match root {
        Root::UnixAbs(dir) => PathBuf::from(dir),
        Root::WinEnv { env, rel } => {
            let base = get_env(env).unwrap_or_else(|| {
                panic!("Environment variable {env} is not set");
            });
            PathBuf::from(base).join(rel)
        }
    }
}

#[cfg(any(target_os = "macos", target_os = "linux"))]
const CONFIG_ROOT: Root = Root::UnixAbs("/etc/openrmm-agent");
#[cfg(target_os = "windows")]
const CONFIG_ROOT: Root = Root::WinEnv {
    env: "PROGRAMDATA",
    rel: "openrmm-agent",
};

#[cfg(any(target_os = "macos", target_os = "linux"))]
const LOG_ROOT: Root = Root::UnixAbs("/var/log");
#[cfg(target_os = "windows")]
const LOG_ROOT: Root = Root::WinEnv {
    env: "LOCALAPPDATA",
    rel: "openrmm-agent",
};

const CONFIG_FILE: &str = "config.json";
const UUID_FILE: &str = "uuid";
const LOG_FILE: &str = "openrmm-agent.log";

#[cfg(any(target_os = "macos", target_os = "linux"))]
const INSTALL_ROOT: Root = Root::UnixAbs("/usr/local/bin");
#[cfg(target_os = "windows")]
const INSTALL_ROOT: Root = Root::WinEnv {
    env: "PROGRAMFILES",
    rel: "openrmm-agent",
};

#[cfg(any(target_os = "macos", target_os = "linux"))]
const EXECUTABLE_FILE: &str = "openrmm-agent";
#[cfg(target_os = "windows")]
const EXECUTABLE_FILE: &str = "openrmm-agent.exe";

pub fn get_config_file_path() -> PathBuf {
    resolve(CONFIG_ROOT, CONFIG_FILE)
}

#[allow(dead_code)]
pub fn get_log_file_path() -> PathBuf {
    resolve(LOG_ROOT, LOG_FILE)
}

pub fn get_log_file_name() -> String {
    LOG_FILE.to_string()
}

pub fn get_uuid_file_path() -> PathBuf {
    resolve(CONFIG_ROOT, UUID_FILE)
}

pub fn get_install_file_path() -> PathBuf {
    resolve(INSTALL_ROOT, EXECUTABLE_FILE)
}

pub fn get_log_dir() -> PathBuf {
    resolve_dir(LOG_ROOT)
}

#[allow(dead_code)]
pub fn get_config_dir() -> PathBuf {
    resolve_dir(CONFIG_ROOT)
}

#[allow(dead_code)]
pub fn get_install_dir() -> PathBuf {
    resolve_dir(INSTALL_ROOT)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[cfg(target_os = "windows")]
    use std::ffi::OsString;

    // -------- UNIX (Linux/macOS) tests --------
    #[cfg(any(target_os = "linux", target_os = "macos"))]
    #[test]
    fn unix_config_dir_is_expected() {
        let p = get_config_dir();
        assert_eq!(p, PathBuf::from("/etc/openrmm-agent"));
    }

    #[cfg(any(target_os = "linux", target_os = "macos"))]
    #[test]
    fn unix_config_file_is_expected() {
        let p = get_config_file_path();
        assert_eq!(p, PathBuf::from("/etc/openrmm-agent").join("config.json"));
    }

    #[cfg(any(target_os = "linux", target_os = "macos"))]
    #[test]
    fn unix_install_dir_is_expected() {
        let p = get_install_dir();
        assert_eq!(p, PathBuf::from("/usr/local/bin"));
    }

    #[cfg(any(target_os = "linux", target_os = "macos"))]
    #[test]
    fn unix_install_file_is_expected() {
        let p = get_install_file_path();
        assert_eq!(p, PathBuf::from("/usr/local/bin").join("openrmm-agent"));
    }

    // -------- WINDOWS tests --------
    // These test the *generic* functions by injecting env, so they don't depend on the real OS env.
    #[cfg(target_os = "windows")]
    #[test]
    fn windows_resolve_dir_programdata() {
        let root = Root::WinEnv {
            env: "PROGRAMDATA",
            rel: "openrmm-agent",
        };

        let p = resolve_dir_with(root, |k| {
            if k == "PROGRAMDATA" {
                Some(OsString::from(r"C:\ProgramData"))
            } else {
                None
            }
        });

        assert_eq!(p, PathBuf::from(r"C:\ProgramData").join("openrmm-agent"));
    }

    #[cfg(target_os = "windows")]
    #[test]
    fn windows_resolve_file_programdata() {
        let root = Root::WinEnv {
            env: "PROGRAMDATA",
            rel: "openrmm-agent",
        };

        // Build dir, then join file (mimics resolve())
        let dir = resolve_dir_with(root, |k| {
            if k == "PROGRAMDATA" {
                Some(OsString::from(r"C:\ProgramData"))
            } else {
                None
            }
        });

        let file = dir.join("config.json");

        assert_eq!(
            file,
            PathBuf::from(r"C:\ProgramData")
                .join("openrmm-agent")
                .join("config.json")
        );
    }

    #[cfg(target_os = "windows")]
    #[test]
    #[should_panic(expected = "Environment variable PROGRAMDATA is not set")]
    fn windows_missing_env_panics() {
        let root = Root::WinEnv {
            env: "PROGRAMDATA",
            rel: "openrmm-agent",
        };

        // No env provided => should panic
        let _ = resolve_dir_with(root, |_k| None);
    }
}
