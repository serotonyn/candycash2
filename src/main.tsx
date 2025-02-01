import "@emotion/react";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AppTheme } from "./constants/theme.ts";
import { AppThemeProvider } from "./providers/ThemeProvider.tsx";

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
