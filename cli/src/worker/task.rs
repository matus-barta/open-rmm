use std::{future::Future, pin::Pin, time::Duration};
use tokio_util::sync::CancellationToken;

pub type WorkerResult = anyhow::Result<()>;

pub type WorkerFuture = Pin<Box<dyn Future<Output = WorkerResult> + Send>>;

pub type WorkerRunFn = fn(CancellationToken) -> WorkerFuture;

#[derive(Clone, Copy)]
pub struct WorkerDefinition {
    pub name: &'static str,
    pub kind: WorkerKind,
}

#[derive(Clone, Copy)]
pub enum WorkerKind {
    Interval {
        interval: Duration,
        run: WorkerRunFn,
    },
    Loop {
        run: WorkerRunFn,
    },
}

pub fn boxed_worker<F>(future: F) -> WorkerFuture
where
    F: Future<Output = WorkerResult> + Send + 'static,
{
    Box::pin(future)
}
