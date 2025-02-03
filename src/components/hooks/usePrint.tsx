import { MyDocument } from "@/components/pos/Receipt";
import { usePosStore } from "@/components/pos/store";
import { pdf } from "@react-pdf/renderer";
import { join } from "@tauri-apps/api/path";

import { getDocumentsPath, printPdf, writePdf } from "../pos/helpers";
// import { useGetCompany } from "./useGetCompany";
import { useUsername } from "./useUsername";

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
  const { username } = useUsername();

  const print = async () => {
    try {
      // const company = await fetchCompany();

      const blob = await pdf(
        MyDocument({
          orderItems,
          // logoUrl: company?.imgUrl,
          total: getGrandTotal(),
          sequence: transaction?.sequence,
          username,
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
      throw err;
    }
  };

  return { print };
};
