import { enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useEffect } from "react";

export const useAutostart = () => {
  useEffect(() => {
    const checkIfAutostartEnabled = async () => {
      if (!(await isEnabled())) {
        await enable();
      }
    };
    checkIfAutostartEnabled();
  }, []);
};
