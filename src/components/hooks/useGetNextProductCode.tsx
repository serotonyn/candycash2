import { useEffect, useState } from "react";

import { Collections, ProductsResponse } from "@/pocketbase-types";
import client from "@/services/client";
import { ClientResponseError } from "pocketbase";
import { manageError } from "@/services/manage-error";

export const useGetNextProductCode = () => {
  const [nextProductCode, setNextProductCode] = useState<number | undefined>(
    undefined
  );

  const fetch = async () => {
    try {
      const products = await client
        ?.collection(Collections.Products)
        .getFullList();

      if (!products?.length) {
        setNextProductCode(1);
        return;
      }

      const product = await client
        ?.collection(Collections.Products)
        .getFirstListItem<ProductsResponse>("", {
          sort: "-code",
        });
      if (!product) {
        throw "product not found";
      }
      setNextProductCode(product?.code + 1);
    } catch (error) {
      manageError(error as ClientResponseError);
      throw err;
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { nextProductCode, refetchNextCode: fetch };
};
