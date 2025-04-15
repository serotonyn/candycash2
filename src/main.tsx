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
import { seed } from "./constants/seed_gourmandises.ts";
import { checkMachineGuid } from "./components/hooks/useCheckMachineGuid";
import { message } from "@tauri-apps/plugin-dialog";

dayjs.locale("fr");

(async () => {
  const guid1 = "1f5a95d9-5f85-4128-b103-dfa6db2aa50c";
  const { machineGuid } = await checkMachineGuid();

  if (machineGuid?.trim() !== guid1) {
    await message("No internet connection", {
      title: "CandyCash",
      kind: "error",
    });
    throw new Error("No internet connection");
  }

  await seed();

  initAutostart();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </React.StrictMode>
  );
})();



declare module "@emotion/react" {
  export interface Theme extends AppTheme { }
}
