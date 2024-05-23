// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

use tauri::{LogicalSize, Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let main_window = app.get_webview_window("main").unwrap();
            if !main_window.is_fullscreen().unwrap() {
                #[cfg(target_os = "macos")]
                main_window
                    .set_size(LogicalSize {
                        height: 720 + 28, // 28 is the size of the bar at the top of the window... I cri
                        width: 1280,
                    })
                    .unwrap();

                main_window.center().unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
