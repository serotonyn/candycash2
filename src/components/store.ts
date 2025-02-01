// import { PrintSettings } from "tauri-plugin-printer/dist/lib/types";
import { create } from "zustand";

export interface Settings {
  id: string;
  // printer_method: PrintSettings["method"];
  // printer_paper: PrintSettings["paper"];
  // printer_scale: PrintSettings["scale"];
  // printer_orientation: PrintSettings["orientation"];
}

interface PosState {
  settings: Settings | undefined;
  setSettings: (settings: Settings | undefined) => void;
}

export const useAppStore = create<PosState>((set) => ({
  settings: undefined,
  setSettings: (settings: Settings | undefined) =>
    set({
      settings,
    }),
}));
