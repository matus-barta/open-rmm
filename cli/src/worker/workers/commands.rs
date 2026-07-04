use tokio_util::sync::CancellationToken;

use super::super::task::{WorkerFuture, boxed_worker};

pub fn run_once(_shutdown: CancellationToken) -> WorkerFuture {
    boxed_worker(async move {
        tracing::debug!("commands worker stub");

        // TODO:
        // - poll server for commands
        // - validate command
        // - execute command
        // - report result back to server

        Ok(())
    })
}
