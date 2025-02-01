import { CloturesResponse, Collections } from '@/pocketbase-types';
import client from '@/services/client';

export const useCreateCloture = () => {
  const create = async (data: { fondDeCaisse: number }) => {
    try {
      return client?.collection(Collections.Clotures).create<CloturesResponse>({
        active: true,
        ...data,
      });
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useCreateCloture",
        message: err,
      });
    }
  };
  return { create };
};
