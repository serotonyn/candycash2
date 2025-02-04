use fs_extra::dir::*;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{path::BaseDirectory, Manager};
use tauri_plugin_shell::process::CommandEvent;
use tauri_plugin_shell::ShellExt;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let resource_path = app.path().resolve("pocketbase", BaseDirectory::Resource)?;
            let local_candy_path = app.path().resolve("candycash", BaseDirectory::LocalData)?;
            let data_path = app
                .path()
                .resolve("candycash/pb_data", BaseDirectory::LocalData)?;
            let public_path = app
                .path()
                .resolve("candycash/pb_public", BaseDirectory::LocalData)?;
            let hooks_path = app
                .path()
                .resolve("candycash/pb_hooks", BaseDirectory::LocalData)?;

            let options = CopyOptions {
                overwrite: true,
                content_only: true,
                ..Default::default()
            };

            // Copy pocketbase files to local candycash
            copy(resource_path, local_candy_path, &options)?;

            let sidecar_command = app
                .shell()
                .sidecar("pocketbase")
                .unwrap()
                .args(["serve"])
                .args(["--dir", data_path.to_str().unwrap()])
                .args(["--publicDir", public_path.to_str().unwrap()])
                .args(["--hooksDir", hooks_path.to_str().unwrap()]);

            let (mut rx, mut _child) = sidecar_command.spawn().expect("Failed to spawn sidecar");

            std::thread::spawn(move || {
                while let Some(output) = rx.blocking_recv() {
                    // Convert CommandEvent to bytes
                    let bytes = match output {
                        CommandEvent::Stdout(data) => data,
                        CommandEvent::Stderr(data) => data,
                        _ => continue, // Skip other event types
                    };

                    // Convert bytes to string
                    let string = std::str::from_utf8(&bytes).unwrap();
                    dbg!(string);
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn print(app: tauri::AppHandle) {
    let sidecar_command = app.shell().sidecar("sumatra").unwrap();

    let (mut rx, mut _child) = sidecar_command.spawn().unwrap();

    std::thread::spawn(move || {
        while let Some(output) = rx.blocking_recv() {
            // Convert CommandEvent to bytes
            let bytes = match output {
                CommandEvent::Stdout(data) => data,
                CommandEvent::Stderr(data) => data,
                _ => continue, // Skip other event types
            };

            // Convert bytes to string
            let string = std::str::from_utf8(&bytes).unwrap();
            dbg!(string);
        }
    });
}
