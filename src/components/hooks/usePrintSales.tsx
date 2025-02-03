import { MyDocument } from "@/components/pos/Sales";
import { TransactionExpanded } from "@/types/expanded";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";
import { useUsername } from "./useUsername";

export const usePrintSales = () => {
  const { username } = useUsername();

  const print = async (
    startDate: string,
    endDate: string,
    totalSales: string,
    totalSalesCount: number,
    grouped: Record<string, TransactionExpanded[]>
  ) => {
    try {
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
      throw err;
    }
  };

  return { print };
};
