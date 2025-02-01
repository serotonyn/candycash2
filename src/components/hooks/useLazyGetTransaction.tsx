import {
  Collections,
  ProductsResponse,
  TransactionsResponse,
} from "@/pocketbase-types";
import client from "@/services/client";
import { OrderItemExpanded, TransactionExpanded } from "@/types/expanded";

const getUrl = async (record: ProductsResponse) => {
  return client?.files.getUrl(record, record.image);
};

export const useLazyGetTransaction = () => {
  const getTransaction = async (filter?: string, sort?: string) => {
    try {
      let transaction: TransactionsResponse | undefined;

      if (!filter) {
        transaction = await client
          ?.collection(Collections.Transactions)
          .getFirstListItem<TransactionExpanded>("", {
            sort: "-created",
            expand: "orderItems(transaction), orderItems(transaction).product",
          });
      } else {
        transaction = await client
          ?.collection(Collections.Transactions)
          .getFirstListItem<TransactionExpanded>(filter, {
            expand: "orderItems(transaction), orderItems(transaction).product",
            sort,
          });
      }

      // @ts-ignore
      const orderItemsWithImageUrls: OrderItemExpanded[] = await Promise.all(
        // @ts-ignore
        transaction.expand["orderItems(transaction)"]?.map(async (s) => {
          if (!s.expand?.product) {
            return s;
          }
          return {
            ...s,
            expand: {
              product: {
                ...s.expand.product,
                imgUrl: await getUrl(s.expand?.product),
              },
            },
          };
        })
      );

      return (
        // @ts-ignore
        {
          ...transaction,
          expand: {
            "orderItems(transaction)": orderItemsWithImageUrls,
          },
        } || undefined
      );
    } catch (err) {
      await client?.collection(Collections.Logs).create({
        file: "useLazyGetTransaction",
        message: err,
      });
      return undefined;
    }
  };

  return {
    getTransaction,
  };
};
