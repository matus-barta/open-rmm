use thiserror::Error;

#[allow(dead_code)]
#[derive(Debug, Error)]
pub enum AppError {
    #[error("invalid configuration: {0}")]
    Config(String),

    #[error("invalid input: {0}")]
    Input(String),

    #[error("parse error: {context}")]
    ParseJson {
        context: &'static str,
        #[source]
        source: serde_json::Error,
    },

    #[error("parse error: {0}")]
    Parse(String),

    #[error("I/O error while {context}")]
    Io {
        context: &'static str,
        #[source]
        source: std::io::Error,
    },

    #[error("request api error: {context}")]
    Network {
        context: &'static str,
        #[source]
        source: Box<dyn std::error::Error + Send + Sync>,
    },

    #[error("operation interrupted")]
    Interrupted,

    #[error("internal error: {0}")]
    Internal(String),

    #[error("timeout while {0}")]
    Timeout(&'static str),
}

impl AppError {
    /// Exit code mapping: consistent and supervisor-friendly.
    /// Common conventions:
    /// - 0 success
    /// - 1 general error
    /// - 2 usage/config error
    /// - 130 terminated by Ctrl+C
    pub fn exit_code(&self) -> u8 {
        match self {
            AppError::Config(_) | AppError::Input(_) => 2,
            AppError::Interrupted => 130,
            _ => 1,
        }
    }

    /// Should the background worker retry this error?
    pub fn is_transient(&self) -> bool {
        match self {
            AppError::Network { .. } | AppError::Timeout(_) => true,
            AppError::Io { source, .. } => {
                use std::io::ErrorKind::*;
                matches!(
                    source.kind(),
                    WouldBlock
                        | TimedOut
                        | Interrupted
                        | ConnectionReset
                        | ConnectionAborted
                        | NotConnected
                )
            }
            _ => false,
        }
    }
}
