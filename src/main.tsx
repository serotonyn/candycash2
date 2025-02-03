import "@emotion/react";
import "./index.css";
import "dayjs/locale/fr";

import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { AppTheme } from "./constants/theme.ts";
import { AppThemeProvider } from "./providers/ThemeProvider.tsx";

dayjs.locale("fr");

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
