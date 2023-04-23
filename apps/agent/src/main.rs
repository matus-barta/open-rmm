use std::env;

mod client;
mod config;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = client::Client {
        config: config::load_config().await?,
    };

    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        if args[1].contains("--otk=") {
            let otk: Vec<_> = args[1].split('=').collect();
            if otk[1].len() == 64 {
                client.register_computer(otk[1].to_string()).await?;
            } else {
                println!("One Time key has to be 64 characters long!")
            }
        } else {
            usage_message()
        }
    } else if args.len() == 1 {
        client.report_system_info().await?;
    } else {
        usage_message()
    }

    Ok(())
}

fn usage_message() {
    println!("Usage:\n
            - no arguments: run agent to collect data\n
            - \"--otk=<64 characters of generated One Time Key>: (without <>) will add computer to RMM\"");
}
