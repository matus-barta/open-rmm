use tokio_util::sync::CancellationToken;

use super::super::task::{WorkerFuture, boxed_worker};

pub fn run_once(_shutdown: CancellationToken) -> WorkerFuture {
    boxed_worker(async move {
        tracing::debug!("heartbeat worker stub");

        // TODO:
        // - load config
        // - create client
        // - send heartbeat to server

        Ok(())
    })
}
