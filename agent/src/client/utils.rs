use chrono::{DateTime, SecondsFormat, Utc};
use std::time::{Duration, UNIX_EPOCH};

pub fn convert_unix_timestamp_to_iso(timestamp: u64) -> String {
    let d = UNIX_EPOCH + Duration::from_secs(timestamp);

    let date_time = DateTime::<Utc>::from(d);
    return date_time.to_rfc3339_opts(SecondsFormat::Millis, true);
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_unix_timestamp_to_iso() {
        let timedate = convert_unix_timestamp_to_iso(1730467844);

        assert_eq!(timedate, "2024-11-01T13:30:44.000Z")
    }
}
