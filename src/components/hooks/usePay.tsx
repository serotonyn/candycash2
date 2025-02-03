import { usePosStore } from "@/components/pos/store";

import { useInitTransaction } from "./useInitTransaction";
import { usePrint } from "./usePrint";
import { useSave } from "./useSave";

export const usePay = () => {
  const reset = usePosStore((state) => state.reset);
  const orderItems = usePosStore((state) => state.orderItems);
  const { save } = useSave();
  const { print } = usePrint();
  const { init } = useInitTransaction();
  const setIsConffettis = usePosStore((state) => state.setIsConffettis);

  const pay = async () => {
    if (!orderItems.length) {
      return;
    } else {
      try {
        await save();
        await print();
        reset();
        init();
        setIsConffettis(true);
      } catch (err) {
        throw err;
      }
    }
  };
  return { pay };
};
