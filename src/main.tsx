import "@emotion/react";
import "./index.css";
import "dayjs/locale/fr";

import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { AppTheme } from "./constants/theme.ts";
import { AppThemeProvider } from "./providers/ThemeProvider.tsx";
import { initAutostart } from "./components/hooks/useAutostart.tsx";
// import { seed } from "./constants/seed_gourmandises.ts";
// import { checkMachineGuid } from "./components/hooks/useCheckMachineGuid";
// import { message } from "@tauri-apps/plugin-dialog";

dayjs.locale("fr");

// const guid1 = "";
// const { machineGuid } = await checkMachineGuid();

// if (machineGuid !== guid1) {
//   await message("No internet connection", {
//     title: "CandyCash",
//     kind: "error",
//   });
//   throw new Error("No internet connection");
// }

initAutostart();

// await seed();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
