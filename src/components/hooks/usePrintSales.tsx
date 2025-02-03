import { MyDocument } from "@/components/pos/Sales";
import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { TransactionExpanded } from "@/types/expanded";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";
import { useAppStore } from "../store";
import { useUsername } from "./useUsername";

export const usePrintSales = () => {
  const { username } = useUsername();
  const settings = useAppStore((state) => state.settings);

  const print = async (
    startDate: string,
    endDate: string,
    totalSales: string,
    totalSalesCount: number,
    grouped: Record<string, TransactionExpanded[]>
  ) => {
    try {
      if (!settings) throw "no settings";
      const blob = await pdf(
        MyDocument({
          username,
          startDate,
          endDate,
          totalSales,
          totalSalesCount: String(totalSalesCount),
          grouped,
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
        file: "usePrintSales",
        message: err,
      });
    }
  };

  return { print };
};
