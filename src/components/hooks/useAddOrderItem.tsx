import { usePosStore } from "@/components/pos/store";
import { OrderItemExpanded, ProductsExpanded } from "@/types/expanded";

import { calculateOrderItemPrice } from "../pos/helpers";

export const useAddOrderItem = () => {
  const quantity = usePosStore((state) => state.quantity);
  const orderItems = usePosStore((state) => state.orderItems);
  const transaction = usePosStore((state) => state.transaction);
  const setOrderItems = usePosStore((state) => state.setOrderItems);
  const setLeftShows = usePosStore((state) => state.setLeftShows);
  const setAskStartShiftDialog = usePosStore(
    (state) => state.setAskStartShiftDialog
  );
  const activeCloture = usePosStore((store) => store.activeCloture);

  const askIfWantToStartShift = () => {
    if (orderItems.length !== 0) return;
    if (activeCloture) return;

    setAskStartShiftDialog(true);
  };

  const pushItem = (item: Partial<OrderItemExpanded>) => {
    if (orderItems.find((i) => i.product === item.product)) {
      const newItems = orderItems.map((i) => {
        if (i.product === item.product) {
          return {
            ...i,
            ...calculateOrderItemPrice(
              item.expand?.product.salePrice!,
              i.quantity! + 1
            ),
          };
        } else {
          return i;
        }
      });
      setOrderItems(newItems);
    } else {
      const newItem = {
        ...item,
        ...calculateOrderItemPrice(item.expand?.product.salePrice!, quantity!),
      };
      setOrderItems([...orderItems, newItem]);
    }
  };

  const addOrderItem = async (selectedItem: ProductsExpanded) => {
    try {
      if (!selectedItem) return;

      askIfWantToStartShift();

      const orderItem: Partial<OrderItemExpanded> = {
        product: selectedItem?.id,
        transaction: transaction?.id,
        itemIndex:
          orderItems
            .map((o) => o.itemIndex!)
            .reduce((a, b) => Math.max(a, b), 0) + 1,
        productName: selectedItem.name,
        category: selectedItem?.category,
        expand: {
          product: selectedItem,
        },
      };

      pushItem(orderItem);
      setLeftShows("CURRENT_TRANSACTION");
    } catch (err) {
      throw err;
    }
  };

  return { addOrderItem };
};
