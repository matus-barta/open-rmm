use backoff::{ExponentialBackoff, backoff::Backoff};
use tokio::time::{self, Duration};
use tokio_util::sync::CancellationToken;

use crate::{client::Client, config::load_config, error::AppError};

use super::super::task::{WorkerFuture, WorkerResult, boxed_worker};

pub fn run_once(shutdown: CancellationToken) -> WorkerFuture {
    boxed_worker(async move { run_reporting_cycle_with_retry(shutdown).await })
}

async fn run_reporting_cycle_with_retry(shutdown: CancellationToken) -> WorkerResult {
    let mut backoff = ExponentialBackoff {
        initial_interval: Duration::from_secs(1),
        max_interval: Duration::from_secs(60),
        max_elapsed_time: None,
        ..Default::default()
    };

    match do_one_cycle().await {
        Ok(()) => {
            backoff.reset();
            tracing::debug!("reporting worker cycle succeeded");
            Ok(())
        }

        Err(e) => {
            let transient = e.is_transient();

            tracing::error!(
                error = ?e,
                transient,
                "reporting worker cycle failed"
            );

            if !transient {
                return Err(anyhow::Error::new(e).context("permanent failure in reporting worker"));
            }

            let Some(delay) = backoff.next_backoff() else {
                return Err(anyhow::Error::new(e)
                    .context("transient reporting error but backoff exhausted"));
            };

            tracing::info!(?delay, "retrying reporting worker after transient error");

            tokio::select! {
                _ = shutdown.cancelled() => {
                    tracing::info!("reporting worker retry cancelled");
                    Ok(())
                }

                _ = time::sleep(delay) => {
                    match do_one_cycle().await {
                        Ok(()) => {
                            backoff.reset();
                            tracing::info!("reporting worker recovery succeeded after retry");
                            Ok(())
                        }

                        Err(e2) => {
                            tracing::warn!(
                                error = ?e2,
                                "reporting worker retry attempt failed; continuing"
                            );

                            Ok(())
                        }
                    }
                }
            }
        }
    }
}

pub async fn do_one_cycle() -> Result<(), AppError> {
    let client = Client {
        config: load_config().await?,
    };

    tracing::info!("Running report system info.");
    client.report_system_info().await?;

    Ok(())
}
