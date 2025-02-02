import { usePosStore } from "@/components/pos/store";
import {
  Collections,
  SequencesResponse,
  TransactionsResponse,
  TransactionsStatusOptions,
} from "@/pocketbase-types";
import client from "@/services/client";

import { useGetActiveCloture } from "./useGetActiveCloture";
import { manageError } from "@/services/manage-error";
import { ClientResponseError } from "pocketbase";

export const useInitTransaction = () => {
  const transaction = usePosStore((state) => state.transaction);
  const setTransaction = usePosStore((state) => state.setTransaction);
  useGetActiveCloture({ requestKey: "init-transaction" });

  let transactionLocal: Partial<TransactionsResponse> | undefined =
    transaction || undefined;

  const init = async () => {
    try {
      const getSequenceTransaction = async () => {
        try {
          const sequences = await client
            ?.collection(Collections.Sequences)
            .getFullList<SequencesResponse>({
              sort: "-created",
            });

          if (!sequences || sequences.length === 0) {
            // throw new Error("First sequence should be seeded");
            const sequence = await client
              ?.collection(Collections.Sequences)
              .create<SequencesResponse>({
                transaction: 0,
              });
            return (sequence?.transaction || 0) + 1;
          } else {
            return sequences[0].transaction + 1;
          }
        } catch (error) {
          manageError(error as ClientResponseError);
        }
      };
      if (!transaction) {
        transactionLocal = {
          sequence: await getSequenceTransaction(),
          user: client?.authStore.model?.id,
          grandTotal: 0,
          paid: 0,
          amountDue: 0,
          status: TransactionsStatusOptions.NOT_PAID,
        };
        setTransaction(transactionLocal);
      }
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useInitTransaction",
        message: err,
      });
    }
  };

  return { init };
};
