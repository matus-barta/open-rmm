use std::time::Duration;

use tokio::{task::JoinSet, time};
use tokio_util::sync::CancellationToken;

use super::{
    task::{WorkerDefinition, WorkerKind, WorkerResult},
    worker_definitions,
};

pub async fn run_background_tasks() -> anyhow::Result<()> {
    tracing::info!("starting background worker supervisor");

    let shutdown = CancellationToken::new();
    let mut tasks = JoinSet::<WorkerResult>::new();

    for worker in worker_definitions() {
        spawn_worker(&mut tasks, worker, shutdown.child_token());
    }

    loop {
        tokio::select! {
            _ = crate::shutdown::shutdown_signal() => {
                tracing::info!("shutdown requested; cancelling workers");
                shutdown.cancel();
                break;
            }

            result = tasks.join_next() => {
                match result {
                    Some(Ok(Ok(()))) => {
                        tracing::warn!("worker exited unexpectedly");
                        shutdown.cancel();
                        break;
                    }
                    Some(Ok(Err(err))) => {
                        tracing::error!(error = ?err, "worker failed");
                        shutdown.cancel();
                        return Err(err);
                    }
                    Some(Err(join_err)) => {
                        tracing::error!(error = ?join_err, "worker panicked or was aborted");
                        shutdown.cancel();
                        return Err(anyhow::Error::new(join_err));
                    }
                    None => {
                        tracing::warn!("all workers exited");
                        return Ok(());
                    }
                }
            }
        }
    }

    wait_for_workers_to_stop(tasks).await;

    tracing::info!("background worker supervisor stopped");
    Ok(())
}

fn spawn_worker(
    tasks: &mut JoinSet<WorkerResult>,
    worker: WorkerDefinition,
    shutdown: CancellationToken,
) {
    match worker.kind {
        WorkerKind::Interval { interval, run } => {
            tasks.spawn(run_interval_worker(worker.name, interval, shutdown, run));
        }
        WorkerKind::Loop { run } => {
            tasks.spawn(run_loop_worker(worker.name, shutdown, run));
        }
    }
}

async fn run_interval_worker(
    name: &'static str,
    interval: Duration,
    shutdown: CancellationToken,
    run: fn(CancellationToken) -> super::task::WorkerFuture,
) -> WorkerResult {
    tracing::info!(
        worker = name,
        interval_secs = interval.as_secs(),
        "starting interval worker"
    );

    let mut ticker = time::interval(interval);
    ticker.set_missed_tick_behavior(time::MissedTickBehavior::Delay);

    loop {
        tokio::select! {
            _ = shutdown.cancelled() => {
                tracing::info!(worker = name, "worker shutdown requested");
                return Ok(());
            }

            _ = ticker.tick() => {
                tracing::debug!(worker = name, "worker tick started");

                match run(shutdown.clone()).await {
                    Ok(()) => {
                        tracing::debug!(worker = name, "worker tick finished");
                    }
                    Err(err) => {
                        tracing::error!(
                            worker = name,
                            error = ?err,
                            "worker tick failed"
                        );

                        return Err(err);
                    }
                }
            }
        }
    }
}

async fn run_loop_worker(
    name: &'static str,
    shutdown: CancellationToken,
    run: fn(CancellationToken) -> super::task::WorkerFuture,
) -> WorkerResult {
    tracing::info!(worker = name, "starting loop worker");

    loop {
        tokio::select! {
            _ = shutdown.cancelled() => {
                tracing::info!(worker = name, "worker shutdown requested");
                return Ok(());
            }

            result = run(shutdown.clone()) => {
                match result {
                    Ok(()) => {
                        tracing::debug!(worker = name, "worker iteration finished");
                    }
                    Err(err) => {
                        tracing::error!(
                            worker = name,
                            error = ?err,
                            "worker iteration failed"
                        );

                        tokio::select! {
                            _ = shutdown.cancelled() => {
                                tracing::info!(
                                    worker = name,
                                    "worker shutdown requested after error"
                                );
                                return Ok(());
                            }
                            _ = time::sleep(Duration::from_secs(5)) => {}
                        }
                    }
                }
            }
        }
    }
}

async fn wait_for_workers_to_stop(mut tasks: JoinSet<WorkerResult>) {
    let graceful = async {
        while let Some(result) = tasks.join_next().await {
            match result {
                Ok(Ok(())) => {
                    tracing::debug!("worker stopped cleanly");
                }
                Ok(Err(err)) => {
                    tracing::warn!(
                        error = ?err,
                        "worker returned error during shutdown"
                    );
                }
                Err(join_err) => {
                    tracing::warn!(
                        error = ?join_err,
                        "worker join error during shutdown"
                    );
                }
            }
        }
    };

    if time::timeout(Duration::from_secs(10), graceful)
        .await
        .is_err()
    {
        tracing::warn!("workers did not stop in time; aborting remaining tasks");

        tasks.abort_all();

        while let Some(result) = tasks.join_next().await {
            tracing::debug!(?result, "aborted worker joined");
        }
    }
}
