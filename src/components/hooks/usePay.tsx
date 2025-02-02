import { usePosStore } from "@/components/pos/store";
import { Collections } from "@/pocketbase-types";
import client from "@/services/client";

import { useInitTransaction } from "./useInitTransaction";
import { usePrint } from "./usePrint";
import { useSave } from "./useSave";

export const usePay = () => {
  const reset = usePosStore((state) => state.reset);
  const orderItems = usePosStore((state) => state.orderItems);
  usePosStore((state) => state.orderItems);
  const { save } = useSave();
  const { print } = usePrint();
  const { init } = useInitTransaction();

  const pay = async () => {
    if (!orderItems.length) {
      return;
    } else {
      try {
        await save();
        // await print();
        reset();
        init();
      } catch (err) {
        client?.collection(Collections.Logs).create({
          file: "usePay",
          message: err,
        });
      }
    }
  };
  return { pay };
};
