import { print_file, printers } from "tauri-plugin-printer-api";

import { MyDocument } from "@/components/pos/Receipt";
import { usePosStore } from "@/components/pos/store";
import { Collections } from "@/pocketbase-types";
// import { useAuth } from "@/providers/UserProvider";
import client from "@/services/client";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";
import { useAppStore } from "../store";
import { useGetCompany } from "./useGetCompany";

export type ScaleOption = "noscale" | "shrink" | "fit";
export type MethodOption = "duplex" | "duplexshort" | "simplex";
export type PaperOption =
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "letter"
  | "legal"
  | "tabloid";
export type OrientationOption = "portrait" | "landscape";

export const usePrint = () => {
  const orderItems = usePosStore((state) => state.orderItems);
  const getGrandTotal = usePosStore((state) => state.computed.getGrandTotal);
  // const { fetch: fetchCompany } = useGetCompany({ requestKey: "usePrint" });
  const transaction = usePosStore((state) => state.transaction);
  // const { currentUser } = useAuth();
  // const settings = useAppStore((state) => state.settings);

  const print = async () => {
    try {
      // if (!settings) throw "no settings";

      const settingss = {
        method: "simplex" as MethodOption,
        paper: "A8" as PaperOption,
        scale: "noscale" as ScaleOption,
        repeat: 1, // total copies
        orientation: "portrait" as OrientationOption,
        // range: "1,2,3"    // print page 1,2,3
        range: {
          // print page 1 - 3
          from: 1,
          to: 2,
        },
      };

      // const company = await fetchCompany();

      const blob = await pdf(
        MyDocument({
          orderItems,
          // logoUrl: company?.imgUrl,
          total: getGrandTotal(),
          sequence: transaction?.sequence,
          // username: currentUser?.username,
          dateCreated: transaction?.created,
        })
      ).toBlob();

      const documentsPath = await getDocumentsPath();
      const filename = `doc.pdf`;

      const pdfPath = await join(documentsPath, filename);
      await writePdf(pdfPath, blob);

      console.log(`pdf: ${pdfPath}`);

      await printPdf();
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "usePrint",
        message: err,
      });
    }
  };

  return { print };
};
