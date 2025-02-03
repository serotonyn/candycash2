import { Command } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const command = Command.create("username", ["%USERNAME%"]);

    command
      .execute()
      .then((output) => {
        console.log("output", output);
        // const username = output.split("username=")[1].split("\n")[0];
        // setUsername(username);
      })
      .catch((error) => {
        console.error("aslkdjalskdjlsak", error);
      });
  }, []);

  return {
    username,
  };
};
