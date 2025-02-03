import { getVersion } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";

export const useGetVersion = () => {
  const [version, setVersion] = useState<string>("");

  async function getAppVersion() {
    try {
      const version = await getVersion();
      return version;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getAppVersion().then((version) => setVersion(version));
  }, []);

  return { version };
};
