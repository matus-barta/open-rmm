use std::path::PathBuf;
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

use crate::utils;

pub fn init_tracing(
    verbose: u8,
    quiet: bool,
    no_file_log: bool,
    log_dir_override: Option<PathBuf>,
) -> anyhow::Result<()> {
    let filter = match verbose {
        0 => "info",
        1 => "debug",
        _ => "trace",
    };

    // Allow RUST_LOG to override if set; otherwise use our default.
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(filter));

    let console_layer = (!quiet).then(|| {
        fmt::layer()
            .with_target(false)
            .with_ansi(true)
            .with_writer(std::io::stderr)
    });

    let (file_layer, _guard) = if no_file_log {
        (None, None)
    } else {
        let log_dir = log_dir_override.unwrap_or_else(|| utils::paths::get_log_dir());

        std::fs::create_dir_all(&log_dir).ok();
        let appender = tracing_appender::rolling::daily(log_dir, utils::paths::get_log_file_name());
        let (writer, guard) = tracing_appender::non_blocking(appender);

        let layer = fmt::layer()
            .with_target(true)
            .with_ansi(false)
            .with_writer(writer);

        (Some(layer), Some(guard))
    };

    tracing_subscriber::registry()
        .with(env_filter)
        .with(console_layer)
        .with(file_layer)
        .init();

    Ok(())
}
