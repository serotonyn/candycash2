import dayjs from "dayjs";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

import { Collections, ProductsResponse } from "@/pocketbase-types";
import client from "@/services/client";
import { OrderItemExpanded, TransactionExpanded } from "@/types/expanded";
import { manageError } from "@/services/manage-error";
import { ClientResponseError } from "pocketbase";

const derived = (transactions: TransactionExpanded[] | undefined) => {
  let startDate = null;
  let endDate = null;

  let total = null;

  if (transactions?.length) {
    const start = transactions[0]?.created;
    const end = transactions[transactions.length - 1]?.created;

    startDate = dayjs(start).format("YYYY-MM-DD À HH:mm");
    endDate = dayjs(end).format("YYYY-MM-DD À HH:mm");
  }

  if (transactions?.length) {
    total = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "DZD",
    }).format(transactions.reduce((acc, cur) => acc + cur.grandTotal, 0));
  }

  return {
    count: transactions?.length || 0,
    total,
    startDate,
    endDate,
  };
};

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
}

export const useGetTransactions = ({
  filter,
  expand,
  requestKey,
}: OwnProps) => {
  const [transactions, setTransactions] = useState<TransactionExpanded[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const transactions = await client
        ?.collection(Collections.Transactions)
        .getFullList<TransactionExpanded>({
          filter: filter || "",
          expand: expand || "",
          requestKey,
          sort: "-cloture.created",
          batch: 99999,
        });
      setTransactions(transactions || []);
    } catch (err) {
      await client?.collection(Collections.Logs).create({
        file: "useGetTransactions",
        message: err,
      });
      manageError(err as ClientResponseError);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  return {
    transactions,
    ...derived(transactions),
    refetch: fetchTransactions,
    loading,
  };
};

interface SingleProps {
  transactionId?: string;
  expand?: string;
  requestKey: string;
}

const getUrl = async (record: ProductsResponse) => {
  return client?.files.getURL(record, record.image);
};

export const useGetTransaction = ({
  transactionId,
  expand,
  requestKey,
}: SingleProps) => {
  const [transaction, setTransaction] = useState<
    TransactionExpanded | undefined
  >(undefined);

  const fetchTransaction = async () => {
    try {
      if (!transactionId) return;

      const transaction = await client
        ?.collection(Collections.Transactions)
        .getOne<TransactionExpanded>(transactionId, {
          expand: expand || "",
          requestKey: requestKey || "",
        });

      // @ts-ignore
      const orderItemsWithImgUrls: OrderItemExpanded[] = await Promise.all(
        // @ts-ignore
        transaction.expand["orderItems(transaction)"]?.map(async (s) => {
          return {
            ...s,
            expand: {
              product: {
                ...s.expand?.product,
                imgUrl: await getUrl(s.expand?.product!),
              },
            },
          };
        })
      );

      // @ts-ignore
      setTransaction({
        ...transaction,
        expand: {
          // @ts-ignore
          ...transaction.expand,
          "orderItems(transaction)": orderItemsWithImgUrls,
        },
      });
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useGetTransaction",
        message: err,
      });
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

  return {
    transaction,
  };
};
