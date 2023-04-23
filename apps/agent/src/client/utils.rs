use chrono::{DateTime, NaiveDateTime, Utc};

pub fn convert_unix_timestamp_to_iso(timestamp: u64) -> String {
    let naive_date_time =
        NaiveDateTime::from_timestamp_millis(timestamp as i64).unwrap_or_default();
    let date_time = DateTime::<Utc>::from_utc(naive_date_time, Utc);
    return date_time.to_rfc3339();
}
