import { Button } from "@fluentui/react-components";
// import { enable, isEnabled } from "@tauri-apps/plugin-autostart";
// import { check } from "@tauri-apps/plugin-updater";
// import { relaunch } from "@tauri-apps/plugin-process";

// async function getAppVersion() {
//   try {
//     const version = await getVersion();
//     console.log(`Current app version: ${version}`);
//     return version;
//   } catch (error) {
//     console.error("Failed to get app version:", error);
//     throw error;
//   }
// }

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [version, setVersion] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke("greet", { name }));
    // if (!(await isEnabled())) {
    //   await enable();
    // }
    // console.log(`registered for autostart? ${await isEnabled()}`);
    // const update = await check();
    // setGreetMsg(update?.version || "--");
    // if (update) {
    //   setGreetMsg(
    //     `found update ${update.version} from ${update.date} with notes ${update.body}`
    //   );
    //   let downloaded = 0;
    //   let contentLength = 0;
    //   // alternatively we could also call update.download() and update.install() separately
    //   await update.downloadAndInstall((event) => {
    //     switch (event.event) {
    //       case "Started":
    //         contentLength = event.data.contentLength || 0;
    //         console.log(
    //           `started downloading ${event.data.contentLength} bytes`
    //         );
    //         break;
    //       case "Progress":
    //         downloaded += event.data.chunkLength;
    //         console.log(`downloaded ${downloaded} from ${contentLength}`);
    //         break;
    //       case "Finished":
    //         console.log("download finished");
    //         break;
    //     }
    //   });
    //   console.log("update installed");
    //   await relaunch();
    // } else {
    //   setGreetMsg("no update found");
    // }
  }

  return (
    <main className="container">
      <h1>Welcome to CandyCash</h1>

      <Button onClick={greet}>Greet</Button>
    </main>
  );
}

export default App;
