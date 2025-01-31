import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
// import { enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";

async function getAppVersion() {
  try {
    const version = await getVersion();
    console.log(`Current app version: ${version}`);
    return version;
  } catch (error) {
    console.error("Failed to get app version:", error);
    throw error;
  }
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [version, setVersion] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke("greet", { name }));
    // if (!(await isEnabled())) {
    //   await enable();
    // }
    // console.log(`registered for autostart? ${await isEnabled()}`);
    const update = await check();
    setGreetMsg(update?.version || "--");
    if (update) {
      setGreetMsg(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      let downloaded = 0;
      let contentLength = 0;
      // alternatively we could also call update.download() and update.install() separately
      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength || 0;
            console.log(
              `started downloading ${event.data.contentLength} bytes`
            );
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            console.log(`downloaded ${downloaded} from ${contentLength}`);
            break;
          case "Finished":
            console.log("download finished");
            break;
        }
      });

      console.log("update installed");
      await relaunch();
    } else {
      setGreetMsg("no update found");
    }
  }

  useEffect(() => {
    getAppVersion().then((version) => {
      setVersion(version);
    });
  }, []);

  return (
    <main className="container">
      <h1>Welcome to CandyCash {version}</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}>
        {/* <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        /> */}
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
