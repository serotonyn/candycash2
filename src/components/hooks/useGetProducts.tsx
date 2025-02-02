/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

import { Collections, ProductsResponse } from "@/pocketbase-types";
import client from "@/services/client";
import { ProductsExpanded } from "@/types/expanded";
import { manageError } from "@/services/manage-error";
import { ClientResponseError } from "pocketbase";

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
}

const getUrl = async (record: ProductsResponse) => {
  return client?.files.getURL(record, record.image);
};

export const useGetProducts = ({ filter, expand, requestKey }: OwnProps) => {
  const [products, setProducts] = useState<ProductsExpanded[]>([]);

  const fetchProducts = async () => {
    try {
      const products = await client
        ?.collection(Collections.Products)
        .getFullList<ProductsResponse>({
          filter: filter || "",
          expand: expand || "product, vendor",
          requestKey,
        });

      // @ts-ignore
      const productsWithImageUrls: ProductsExpanded[] = await Promise.all(
        // @ts-ignore
        products?.map(async (s) => {
          return {
            ...s,
            imgUrl: await getUrl(s),
          };
        })
      );

      setProducts(productsWithImageUrls || []);
    } catch (error) {
      await client?.collection(Collections.Logs).create({
        file: "useGetProducts",
        message: error,
      });
      manageError(error as ClientResponseError);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  return {
    products,
    refetch: fetchProducts,
  };
};
