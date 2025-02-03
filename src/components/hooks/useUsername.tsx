import { Command } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const command = Command.create("powershell", "$env:USERNAME");

    command
      .execute()
      .then((output) => {
        const stdout = output.stdout;
        if (!stdout) return;
        const username = stdout.substring(0, stdout.length - 2);
        setUsername(username);
      })
      .catch((error) => {
        console.error("aslkdjalskdjlsak", error);
      });
  }, []);

  return {
    username,
  };
};
