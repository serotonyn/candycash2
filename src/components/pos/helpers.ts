import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { OrderItemsResponse } from "@/pocketbase-types";
// import { app, fs } from "@tauri-apps/api";
import { join, localDataDir } from "@tauri-apps/api/path";

dayjs.extend(relativeTime);

export const calculateGrandTotal = (
  orderItems: Partial<OrderItemsResponse>[]
) => orderItems.reduce((acc, cur) => cur.subtotal! + acc, 0);

export async function getDocumentsPath() {
  const appDataDirPath = await localDataDir();
  // const appName = await app.getName();
  const documentPath = await join(
    appDataDirPath,
    // `com.${appName}.dev`,
    "documents"
  );
  // if (!(await fs.exists(documentPath))) {
  //   await fs.createDir(documentPath);
  // }
  return documentPath;
}

export async function writePdf(pdfPath: string, file: Blob) {
  // if (await fs.exists(pdfPath)) return;

  // await fs.writeBinaryFile({
  //   path: pdfPath,
  //   contents: new Uint8Array(await file.arrayBuffer()),
  // });

  return document;
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
