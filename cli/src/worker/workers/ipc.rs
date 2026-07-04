use std::time::Duration;

use tokio_util::sync::CancellationToken;

use super::super::task::{WorkerFuture, boxed_worker};

pub fn run_once(shutdown: CancellationToken) -> WorkerFuture {
    boxed_worker(async move {
        tracing::debug!("ipc worker stub");

        // TODO:
        // - start/connect to local IPC
        // - communicate with locally running GUI/app
        // - forward messages where needed

        tokio::select! {
            _ = shutdown.cancelled() => {
                tracing::info!("ipc worker stub cancelled");
            }

            _ = tokio::time::sleep(Duration::from_secs(5)) => {}
        }

        Ok(())
    })
}
