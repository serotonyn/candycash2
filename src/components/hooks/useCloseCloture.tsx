import { CloturesResponse, Collections } from "@/pocketbase-types";
import client from "@/services/client";

export const useCloseCloture = () => {
  const closeCloture = async (id: string) => {
    try {
      return client
        ?.collection(Collections.Clotures)
        .update<CloturesResponse>(id, {
          active: false,
        });
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useCloseCloture",
        message: err,
      });
    }
  };
  return { closeCloture };
};
