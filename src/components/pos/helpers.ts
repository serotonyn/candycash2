import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { OrderItemsResponse } from "@/pocketbase-types";
import { getName } from "@tauri-apps/api/app";
import { exists, mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { join, localDataDir } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/plugin-shell";

dayjs.extend(relativeTime);

export const calculateGrandTotal = (
  orderItems: Partial<OrderItemsResponse>[]
) => orderItems.reduce((acc, cur) => cur.subtotal! + acc, 0);

export async function getDocumentsPath() {
  const appDataDirPath = await localDataDir();
  const appName = await getName();
  const documentPath = await join(appDataDirPath, `${appName}`, "documents");
  if (!(await exists(documentPath))) {
    await mkdir(documentPath);
  }
  return documentPath;
}

export async function writePdf(pdfPath: string, file: Blob) {
  await writeFile(pdfPath, new Uint8Array(await file.arrayBuffer()));
}

export async function printPdf() {
  const command = Command.sidecar(
    "bin/sumatra",
    [
      "-print-to-default",
      "-print-settings",
      "'1-2,portrait,noscale,simplex,repeat=1,paper=A8'",
      "doc.pdf",
    ],
    {
      cwd: `${await getDocumentsPath()}`,
    }
  );
  await command.execute();
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Extracting the Base64 data
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export const isNum = (val: string) => /^\d+$/.test(val);

export const getSvgInnerHtml = (svg: string) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  return svgElement.innerHTML;
};

export const calculateOrderItemPrice = (
  retailPrice: number,
  quantity: number
) => {
  if (retailPrice === undefined || quantity === undefined) {
    throw new Error("calculateOrderItemPrice");
  }
  const newSalePrice = retailPrice;
  const newQuantity = quantity;

  let discount = 0;
  let price = 0;

  price = newSalePrice * newQuantity;

  return {
    discount,
    salePrice: Number(newSalePrice),
    quantity: newQuantity,
    subtotal: price,
  };
};

export const getRelativeTime = (date: Dayjs) => {
  if (date.isBefore(dayjs().subtract(1, "D"))) {
    return date.fromNow();
  } else {
    return date.format("DD/MM/YYYY HH:mm:ss");
  }
};
