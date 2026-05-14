use crate::utils;

use std::{io::IsTerminal, path::PathBuf};

use anyhow::{Context, Result};
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

/// Initialize tracing subscriber with:
/// - optional console logging (disabled by `quiet`)
/// - optional file logging (disabled by `no_file_log`)
/// - `RUST_LOG` overrides default verbosity mapping
///
/// IMPORTANT: Returns a `WorkerGuard` that MUST be kept alive for file logging to flush.
pub fn init_tracing(
    verbose: u8,
    quiet: bool,
    no_file_log: bool,
    log_dir_override: Option<PathBuf>,
) -> Result<Option<tracing_appender::non_blocking::WorkerGuard>> {
    let filter = match verbose {
        0 => "info",
        1 => "debug",
        _ => "trace",
    };

    // Allow RUST_LOG to override if set; otherwise use our default.
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(filter));

    // Console layer (stderr)
    let console_layer = (!quiet).then(|| {
        let ansi = std::io::stderr().is_terminal();
        fmt::layer()
            .with_target(false)
            .with_ansi(ansi)
            .with_writer(std::io::stderr)
    });

    // File layer (rolling daily)
    let (file_layer, guard) = if no_file_log {
        (None, None)
    } else {
        let log_dir = log_dir_override.unwrap_or_else(|| utils::paths::get_log_dir());

        std::fs::create_dir_all(&log_dir)
            .with_context(|| format!("Failed to create log dir: {}", log_dir.display()))?;

        let file_name = utils::paths::get_log_file_name();
        let appender = tracing_appender::rolling::daily(&log_dir, file_name);
        let (writer, guard) = tracing_appender::non_blocking(appender);

        let layer = fmt::layer()
            .with_target(true)
            .with_ansi(false)
            .with_writer(writer);

        (Some(layer), Some(guard))
    };

    // Build subscriber
    tracing_subscriber::registry()
        .with(env_filter)
        .with(console_layer)
        .with(file_layer)
        .try_init()
        .ok(); // If already initialized, ignore. Change to `?` if you want hard failure.

    Ok(guard)
}
