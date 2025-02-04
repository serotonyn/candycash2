import { enable, isEnabled } from "@tauri-apps/plugin-autostart";

export const initAutostart = async () => {
  if (!(await isEnabled())) {
    await enable();
  }
};
