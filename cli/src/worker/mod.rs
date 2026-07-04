mod supervisor;
mod task;
mod workers;

use std::time::Duration;

use task::{WorkerDefinition, WorkerKind};

pub use supervisor::run_background_tasks;
pub use workers::reporting::do_one_cycle;

pub(crate) fn worker_definitions() -> Vec<WorkerDefinition> {
    vec![
        WorkerDefinition {
            name: "reporting",
            kind: WorkerKind::Interval {
                interval: Duration::from_secs(60 * 5),
                run: workers::reporting::run_once,
            },
        },
        WorkerDefinition {
            name: "heartbeat",
            kind: WorkerKind::Interval {
                interval: Duration::from_secs(30),
                run: workers::heartbeat::run_once,
            },
        },
        WorkerDefinition {
            name: "commands",
            kind: WorkerKind::Interval {
                interval: Duration::from_secs(60),
                run: workers::commands::run_once,
            },
        },
        WorkerDefinition {
            name: "ipc",
            kind: WorkerKind::Loop {
                run: workers::ipc::run_once,
            },
        },
    ]
}
