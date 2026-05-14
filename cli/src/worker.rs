use crate::error::AppError;
use backoff::{ExponentialBackoff, backoff::Backoff};
use tokio::time::{self, Duration};

pub async fn background_worker(interval_secs: u64) -> anyhow::Result<()> {
    tracing::info!(interval_secs, "starting background worker");

    let mut ticker = time::interval(Duration::from_secs(interval_secs));
    ticker.set_missed_tick_behavior(time::MissedTickBehavior::Delay);

    // A backoff instance for transient failures
    let mut backoff = ExponentialBackoff {
        initial_interval: Duration::from_secs(1),
        max_interval: Duration::from_secs(60),
        max_elapsed_time: None, // keep retrying transient issues indefinitely
        ..Default::default()
    };

    loop {
        ticker.tick().await;

        // One "cycle" of work
        match do_one_cycle().await {
            Ok(()) => {
                backoff.reset();
                tracing::debug!("worker cycle succeeded");
            }
            Err(e) => {
                let transient = e.is_transient();
                tracing::error!(error = ?e, transient, "worker cycle failed");

                if !transient {
                    // Permanent: bubble up; supervisor should restart or alert.
                    return Err(
                        anyhow::Error::new(e).context("permanent failure in background worker")
                    );
                }

                // Transient: retry with backoff
                if let Some(delay) = backoff.next_backoff() {
                    tracing::info!(?delay, "retrying after transient error");
                    time::sleep(delay).await;

                    // Optional immediate retry attempt (instead of waiting for next tick)
                    match do_one_cycle().await {
                        Ok(()) => {
                            backoff.reset();
                            tracing::info!("recovery succeeded after retry");
                        }
                        Err(e2) => {
                            tracing::warn!(error = ?e2, "retry attempt failed; continuing");
                            // continue loop; next tick + backoff applies
                        }
                    }
                } else {
                    // Shouldn't happen with max_elapsed_time=None, but keep safe behavior.
                    return Err(
                        anyhow::Error::new(e).context("transient error but backoff exhausted")
                    );
                }
            }
        }
    }
}

async fn do_one_cycle() -> Result<(), AppError> {
    tracing::info!("Running report system info.");
    client.report_system_info().await?;
    Ok(())
}
