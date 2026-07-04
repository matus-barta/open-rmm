#[cfg(not(target_os = "linux"))]
fn main() {
    panic!("This crate only supports Linux");
}

#[cfg(target_os = "linux")]
mod app;

#[cfg(target_os = "linux")]
fn main() {
    app::run();
}
