import { Command } from "@tauri-apps/plugin-shell";

export const checkMachineGuid = async () => {
  const checkMachineGuid = async () => {
    const command = await Command.create(
      "powershell",
      "Get-ItemProperty -Path HKLM:\\SOFTWARE\\Microsoft\\Cryptography | Select-Object -ExpandProperty MachineGuid"
    );

    return command
      .execute()
      .then((output) => {
        const stdout = output.stdout;
        if (!stdout) return;
        return stdout;
      })
      .catch(() => {
        return "";
      });
  };

  return {
    machineGuid: await checkMachineGuid(),
  };
};
