import { Update } from "@tauri-apps/plugin-updater";
import { useRef, useState } from "react";

export const useUpdate = () => {
  const [contentLength, setContentLength] = useState<number>(0);
  const downloaded = useRef<number>(0);

  async function update(update: Update) {
    await update.download((event) => {
      switch (event.event) {
        case "Started":
          setContentLength(event.data.contentLength || 0);
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case "Progress":
          downloaded.current += event.data.chunkLength;
          console.log(`downloaded ${downloaded} from ${contentLength}`);
          break;
        case "Finished":
          console.log("download finished");
          break;
      }
    });
  }

  return {
    update,
    downloaded: downloaded.current,
    contentLength,
  };
};
