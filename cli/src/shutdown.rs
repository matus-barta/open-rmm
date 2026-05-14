use tokio::signal;

pub async fn shutdown_signal() {
    // Cross-platform Ctrl+C
    let ctrl_c = async {
        let _ = signal::ctrl_c().await;
    };

    #[cfg(unix)]
    let term = async {
        use tokio::signal::unix::{SignalKind, signal};
        let mut sigterm = signal(SignalKind::terminate()).expect("install SIGTERM handler");
        sigterm.recv().await;
    };

    #[cfg(not(unix))]
    let term = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            tracing::info!("received Ctrl+C");
        }
        _ = term => {
            tracing::info!("received SIGTERM");
        }
    }
}
