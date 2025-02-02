import { create } from "zustand";

interface SalesStore {
  selectedSaleId: string | undefined;
  setSelectedSaleId: (selectedSaleId: string | undefined) => void;
}

export const useSalesStore = create<SalesStore>((set) => ({
  selectedSaleId: undefined,
  setSelectedSaleId: (selectedSaleId: string | undefined) =>
    set(() => ({ selectedSaleId })),
}));
