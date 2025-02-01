import { Collections } from '@/pocketbase-types';
import client from '@/services/client';
import { TransactionExpanded } from '@/types/expanded';

export const useGetTotalTransactionsBetweenDates = () => {
  const getTotal = async (startDate: string) => {
    try {
      const transactions = await client
        ?.collection(Collections.Transactions)
        .getFullList<TransactionExpanded>({
          filter: `created > "${startDate}"`,
        });

      return transactions?.reduce(
        (acc, transaction) => acc + transaction.grandTotal,
        0
      );
    } catch (err) {
      await client?.collection(Collections.Logs).create({
        file: 'useGetTotalTransactionsBetweenDates',
        message: err,
      })
      return undefined;
    }
  };

  return {
    getTotal,
  };
};
