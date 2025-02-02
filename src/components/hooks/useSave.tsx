import { usePosStore } from "@/components/pos/store";
import {
  Collections,
  SequencesResponse,
  TransactionsResponse,
} from "@/pocketbase-types";
import client from "@/services/client";

export const useSave = () => {
  const orderItems = usePosStore((state) => state.orderItems);
  const transaction = usePosStore((state) => state.transaction);
  const setTransaction = usePosStore((state) => state.setTransaction);
  const getGrandTotal = usePosStore((state) => state.computed.getGrandTotal);
  const activeCloture = usePosStore((state) => state.activeCloture);

  const save = async () => {
    if (!orderItems.length) {
      return;
    } else {
      // transcation should never be undefined, because useSave can only be called if useAddOrderItem has been called (and that hook creates the transaction in posStore)
      try {
        const newTransaction: Partial<TransactionsResponse> = {
          ...transaction,
          grandTotal: getGrandTotal(),
          cloture: activeCloture?.id,
        };

        const promise = client
          ?.collection(Collections.Transactions)
          .getOne<TransactionsResponse>(transaction!.id || "");

        let savedTransaction: Partial<TransactionsResponse> | undefined;
        await promise
          ?.then(async (transaction: TransactionsResponse) => {
            // I dunno when this happens or if it happens
            debugger;
            throw new Error("transaction already exists");
            savedTransaction = transaction;
            await client
              ?.collection(Collections.Transactions)
              .update(transaction.id, newTransaction);
          })
          .catch(async () => {
            const seq = await client
              ?.collection(Collections.Sequences)
              .getFirstListItem<SequencesResponse>("");

            if (seq?.transaction === undefined) {
              throw new Error("no sequence");
            }

            savedTransaction = await client
              ?.collection(Collections.Transactions)
              .create(newTransaction);
            setTransaction({
              ...transaction,
              id: savedTransaction?.id,
            });
            await client?.collection(Collections.Sequences).update(seq.id, {
              transaction: ++seq.transaction,
            });
          });

        const savedOrderItems = await client
          ?.collection(Collections.OrderItems)
          .getFullList({
            filter: `transaction = "${transaction?.id}"`,
          });

        for await (const orderItem of savedOrderItems || []) {
          client?.collection(Collections.OrderItems).delete(orderItem.id!);
        }

        for await (const orderItem of orderItems) {
          client?.collection(Collections.OrderItems).create({
            ...orderItem,
            transaction: savedTransaction?.id,
          });
        }
      } catch (err) {
        client?.collection(Collections.Logs).create({
          file: "useSave",
          message: err,
        });
        throw err;
      }
    }
  };
  return { save };
};
