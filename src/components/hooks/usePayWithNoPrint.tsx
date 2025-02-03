import { usePosStore } from "@/components/pos/store";

import { useInitTransaction } from "./useInitTransaction";
import { useOpenCashier } from "./useOpenCashier";
import { useSave } from "./useSave";

export const usePayWithNoPrint = () => {
  const reset = usePosStore((state) => state.reset);
  const orderItems = usePosStore((state) => state.orderItems);
  usePosStore((state) => state.orderItems);
  const { save } = useSave();
  const { openCashier } = useOpenCashier();
  const { init } = useInitTransaction();

  const payWithNoPrint = async () => {
    if (!orderItems.length) {
      return;
    } else {
      try {
        await save();
        await openCashier();
        reset();
        init();
      } catch (err) {
        throw err;
      }
    }
  };
  return { payWithNoPrint };
};
