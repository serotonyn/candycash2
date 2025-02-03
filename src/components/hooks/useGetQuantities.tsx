import React from "react";

import { CloturesResponse, Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { OrderItemExpanded } from "@/types/expanded";

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
  block: boolean;
  deps: any[];
}

export interface Quantity {
  productId: string;
  productName: string;
  quantity: number;
  code: number;
  cloture?: CloturesResponse;
}

function reduceOrderItems(orderItems: OrderItemExpanded[]): Quantity[] {
  const resultObj: Record<string, Quantity> = {};

  orderItems.forEach((item) => {
    const { product, productName, quantity, expand } = item;

    if (!resultObj[product]) {
      resultObj[product] = {
        productId: product,
        productName: productName,
        quantity: quantity,
        code: expand!.product.code,
        cloture: expand?.transaction?.expand?.cloture,
      };
    } else {
      resultObj[product].quantity += quantity;
    }
  });

  const result: Quantity[] = Object.values(resultObj);

  return result;
}

export const useGetQuantities = ({
  requestKey,
  filter,
  block,
  deps,
}: OwnProps) => {
  const [quantities, setQuantities] = React.useState<Quantity[]>([]);

  const get = async (): Promise<Quantity[] | []> => {
    if (!filter || block) return [];
    try {
      const orderItems = await client
        ?.collection(Collections.OrderItems)
        .getFullList<OrderItemExpanded>({
          filter,
          expand: "product, transaction.cloture",
          sort: "-transaction.cloture.created",
          requestKey,
        });

      if (orderItems?.length) {
        return reduceOrderItems(orderItems);
      } else {
        return [];
      }
    } catch (err) {
      throw err;
      return [];
    }
  };

  React.useEffect(() => {
    get().then(setQuantities);
  }, deps);

  return {
    refetch: get,
    quantities,
  };
};
