import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { OrderItemExpanded } from "@/types/expanded";

import { usePosStore } from "../pos/store";

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
}

export interface TopSale {
  productId: string;
  productName: string;
  quantity: number;
  code: number;
}

function reduceOrderItems(orderItems: OrderItemExpanded[]): TopSale[] {
  const resultObj: Record<string, TopSale> = {};

  orderItems.forEach((item) => {
    const { product, productName, quantity, expand } = item;

    if (!resultObj[product]) {
      resultObj[product] = {
        productId: product,
        productName: productName,
        quantity: quantity,
        code: expand!.product.code,
      };
    } else {
      resultObj[product].quantity += quantity;
    }
  });

  const result: TopSale[] = Object.values(resultObj);

  return result;
}

export const useGetTopSales = ({ requestKey, filter }: OwnProps) => {
  const activeCloture = usePosStore((store) => store.activeCloture);

  const fetchTopSalesToday = async (): Promise<TopSale[] | []> => {
    if (!activeCloture?.created) throw "no start date found";
    try {
      const orderItems = await client
        ?.collection(Collections.OrderItems)
        .getFullList<OrderItemExpanded>({
          filter: filter || `created > "${activeCloture?.created}"`,
          expand: "product",
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

  return {
    fetchTopSales: fetchTopSalesToday,
  };
};
