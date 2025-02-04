import { Command } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  const getUsername = async () => {
    const command = Command.create("powershell", "$env:USERNAME");

    return command
      .execute()
      .then((output) => {
        const stdout = output.stdout;
        if (!stdout) return;
        const username = stdout.substring(0, stdout.length - 2);
        setUsername(username);
        return username;
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getUsername();
  }, []);

  return {
    username,
    getUsername,
  };
};
