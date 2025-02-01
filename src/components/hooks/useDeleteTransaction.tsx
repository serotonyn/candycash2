import { Collections } from "@/pocketbase-types";
import client from "@/services/client";

export const useDeleteTransaction = () => {
  const remove = async (transactionId: string) => {
    try {
      await client?.collection(Collections.Transactions).delete(transactionId);
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useDeleteTransaction",
        message: err,
      });
    }
  };

  return { remove };
};
