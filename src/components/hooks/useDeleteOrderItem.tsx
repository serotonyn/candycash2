import { usePosStore } from '@/components/pos/store';
import { Collections } from '@/pocketbase-types';
import client from '@/services/client';
import { OrderItemExpanded } from '@/types/expanded';

export const useDeleteOrderItem = () => {
  const selectedIndex = usePosStore((state) => state.selectedIndex);
  const setSelectedIndex = usePosStore((state) => state.setSelectedIndex);
  const orderItems = usePosStore((state) => state.orderItems);
  const setOrderItems = usePosStore((state) => state.setOrderItems);
  const reset = usePosStore((state) => state.reset);
  const transaction = usePosStore((state) => state.transaction);

  const deleteOrderItem = async () => {
    try {
      if (selectedIndex === undefined) return;
      const newOrderItems = orderItems.filter(
        (item) => item.itemIndex !== selectedIndex
      );
      setOrderItems(newOrderItems);
      setSelectedIndex(undefined);
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: 'useDeleteOrderItem',
        message: err,
      })
    }
  };

  const deleteOrderItemWhenHistory = async (item: OrderItemExpanded) => {
    try {
      console.log(transaction)
      if (orderItems.length === 1) {
        await client?.collection(Collections.Transactions).delete(item.transaction)
        reset()
      } else {
        await client?.collection(Collections.OrderItems).delete(item.id)
        const fetchedOrderItems = await client?.collection(Collections.OrderItems).getFullList({
          filter: `transaction = "${item.transaction}"`,
        })
        setOrderItems(fetchedOrderItems as Partial<OrderItemExpanded>[])
      }
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: 'deleteOrderItemWhenHistory',
        message: err,
      })
    }

  }

  return { deleteOrderItem, deleteOrderItemWhenHistory };
};
