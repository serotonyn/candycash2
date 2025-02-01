// import { print_file } from 'tauri-plugin-printer';

import { MyDocument } from "@/components/pos/Opencashier";
import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, writePdf } from "../pos/helpers";
import { useAppStore } from "../store";

export const useOpenCashier = () => {
  const settings = useAppStore((state) => state.settings);

  const openCashier = async () => {
    try {
      if (!settings) throw "no settings";
      const blob = await pdf(MyDocument()).toBlob();

      const documentsPath = await getDocumentsPath();
      const filename = `open-cashier.pdf`;

      const pdfPath = await join(documentsPath, filename);
      await writePdf(pdfPath, blob);

      // await print_file({
      //   id: "Q2Fub24gRzMwMTAgc2VyaWVz",
      //   path: pdfPath,
      //   print_setting: {
      //     method: settings.printer_method, // duplex | simplex | duplexshort
      //     paper: settings.printer_paper, // "A2" | "A3" | "A4" | "A5" | "A6" | "letter" | "legal" | "tabloid"
      //     scale: settings.printer_scale, //"noscale" | "shrink" | "fit"
      //     repeat: 1, // total copies
      //     orientation: settings.printer_orientation,
      //     // range: "1,2,3"    // print page 1,2,3
      //     range: {
      //       // print page 1 - 3
      //       from: 1,
      //       to: 2,
      //     },
      //   },
      // });
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useOpenCashier",
        message: err,
      });
    }
  };

  return { openCashier };
};
