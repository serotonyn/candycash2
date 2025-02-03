// import { print_file } from 'tauri-plugin-printer';

import { MyDocument } from "@/components/pos/Opencashier";
import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";

export const useOpenCashier = () => {
  const openCashier = async () => {
    try {
      const blob = await pdf(MyDocument()).toBlob();

      const documentsPath = await getDocumentsPath();
      const filename = `doc.pdf`;

      const pdfPath = await join(documentsPath, filename);
      await writePdf(pdfPath, blob);

      console.log(`pdf: ${pdfPath}`);

      await printPdf();
    } catch (err) {
      throw err;
    }
  };

  return { openCashier };
};
