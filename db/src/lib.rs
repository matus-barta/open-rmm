use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn greet(str: &str) -> String {
    format!("Hello, {}!", str)
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {}
}
