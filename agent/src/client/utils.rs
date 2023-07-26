use chrono::{DateTime, SecondsFormat, Utc};
use std::time::{Duration, UNIX_EPOCH};

pub fn convert_unix_timestamp_to_iso(timestamp: u64) -> String {
    let d = UNIX_EPOCH + Duration::from_secs(timestamp);

    let date_time = DateTime::<Utc>::from(d);
    return date_time.to_rfc3339_opts(SecondsFormat::Millis, true);
}
