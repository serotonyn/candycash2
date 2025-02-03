import { MyDocument } from "@/components/pos/Cloture";
import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";
import { TopSale } from "./useGetTopSales";
import { useUsername } from "./useUsername";

export const usePrintCloture = () => {
  const { username } = useUsername();

  const print = async (
    startDate: string,
    endDate: string,
    fondDeCaisse: string,
    totalSales: string,
    balance: string,
    topSales: TopSale[]
  ) => {
    try {
      const blob = await pdf(
        MyDocument({
          username,
          startDate,
          endDate,
          fondDeCaisse,
          totalSales,
          balance,
          topSales,
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
        file: "usePrintCloture",
        message: err,
      });
    }
  };

  return { print };
};
