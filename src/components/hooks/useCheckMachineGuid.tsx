import { Command } from "@tauri-apps/plugin-shell";
import { useEffect } from "react";

export const useCheckMachineGuid = () => {
  const checkMachineGuid = async () => {
    const command = await Command.create(
      "powershell",
      "Get-ItemProperty -Path HKLM:\\SOFTWARE\\Microsoft\\Cryptography | Select-Object -ExpandProperty MachineGuid"
    );

    return command
      .execute()
      .then((output) => {
        const stdout = output.stdout;
        console.log("*******", stdout);
        if (!stdout) return;
        console.log(stdout);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    checkMachineGuid();
  }, []);
};
