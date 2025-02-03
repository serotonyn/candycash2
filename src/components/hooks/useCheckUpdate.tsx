import { check, Update } from "@tauri-apps/plugin-updater";
import { useState } from "react";

export const useCheckUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<Update | null>(null);

  async function checkUpdate() {
    setLoading(true);
    try {
      const update = await check();
      if (update) {
        setResponse(update);
      }
    } catch (error) {
      if (error === "Could not fetch a valid release JSON from the remote") {
        setError("no-internet");
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("unknown");
      }
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setError("");
    setLoading(false);
    setResponse(null);
  };

  return { check: checkUpdate, loading, error, updateData: response, reset };
};
