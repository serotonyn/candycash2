import { create } from "zustand";

// import { calculateOrderItemPrice } from '@/components/pos/helpers';
import { CloturesResponse, TransactionsResponse } from "@/pocketbase-types";
import { OrderItemExpanded, ProductsExpanded } from "@/types/expanded";

interface PosState {
  activeCloture: CloturesResponse | undefined;
  setActiveCloture: (activeCloture?: CloturesResponse | undefined) => void;
  transaction: Partial<TransactionsResponse> | undefined;
  setTransaction: (
    transaction: Partial<TransactionsResponse> | undefined
  ) => void;
  leftShows: "IDLE" | "HISTORY" | "CURRENT_TRANSACTION";
  setLeftShows: (leftShows: "IDLE" | "HISTORY" | "CURRENT_TRANSACTION") => void;
  selectedCategoryId: string | undefined;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
  // selectedItem: ProductsExpanded | undefined;
  // setSelectedItem: (selectedItem: ProductsExpanded | undefined) => void;
  retailPrice: number;
  setRetailPrice: (retailPrice: string) => void;
  quantity: number;
  setQuantity: (quantity: string) => void;
  selectedIndex: number | undefined;
  setSelectedIndex: (selectedIndex: number | undefined) => void;
  orderItems: Partial<OrderItemExpanded>[];
  setOrderItems: (orderItems: Partial<OrderItemExpanded>[]) => void;
  reset: () => void;
  computed: {
    getGrandTotal: () => number;
  };
  enterCodeDialog: boolean;
  toggleEnterCodeDialog: () => void;
  focusedInput: "retailPrice" | "quantity" | undefined;
  setFocusedInput: (
    focusedInput: "retailPrice" | "quantity" | undefined
  ) => void;
  askStartShiftDialog: boolean;
  setAskStartShiftDialog: (askStartShiftDialog: boolean) => void;
}

export const usePosStore = create<PosState>((set, get) => ({
  activeCloture: undefined,
  setActiveCloture: (activeCloture: CloturesResponse | undefined) =>
    set({ activeCloture }),
  transaction: undefined,
  setTransaction: (transaction: Partial<TransactionsResponse> | undefined) =>
    set({
      transaction,
    }),
  leftShows: "IDLE",
  setLeftShows: (leftShows: "IDLE" | "HISTORY" | "CURRENT_TRANSACTION") =>
    set({ leftShows }),
  selectedCategoryId: undefined,
  setSelectedCategoryId: (selectedCategoryId: string) =>
    set(() => ({ selectedCategoryId })),
  selectedItem: undefined,
  // setSelectedItem: (selectedItem: ProductsExpanded | undefined) =>
  //   set(() => ({ selectedItem })),
  retailPrice: 0,
  setRetailPrice: (retailPrice: string) => {
    set(() => ({ retailPrice: Number(retailPrice) }));

    // const selectedOrderItem = get().orderItems.find(
    //   (orderItem: Partial<OrderItemExpanded>) =>
    //     orderItem.itemIndex === get().selectedIndex
    // );
    // if (!selectedOrderItem) return;

    // set(() => ({
    //   orderItems: get().orderItems.map((item) =>
    //     item.itemIndex === selectedOrderItem.itemIndex
    //       ? {
    //           ...item,
    //           ...calculateOrderItemPrice(Number(retailPrice), get().quantity),
    //         }
    //       : item
    //   ),
    // }));
  },
  quantity: 1,
  setQuantity: (quantity: string) => {
    set(() => ({ quantity: Number(quantity) }));

    // const selectedOrderItem = get().orderItems.find(
    //   (orderItem: Partial<OrderItemExpanded>) =>
    //     orderItem.itemIndex === get().selectedIndex
    // );
    // if (!selectedOrderItem) return;

    // set(() => ({
    //   orderItems: get().orderItems.map((item) =>
    //     item.itemIndex === selectedOrderItem.itemIndex
    //       ? {
    //           ...item,
    //           ...calculateOrderItemPrice(get().retailPrice, Number(quantity)),
    //         }
    //       : item
    //   ),
    // }));
  },
  selectedIndex: undefined,
  setSelectedIndex: (selectedIndex: number | undefined) =>
    set(() => ({ selectedIndex })),
  orderItems: [],
  setOrderItems: (orderItems: Partial<OrderItemExpanded>[]) =>
    set({ orderItems }),
  reset: () => {},
  // set({
  //   transaction: undefined,
  //   leftShows: "IDLE",
  //   selectedItem: undefined,
  //   retailPrice: 0,
  //   quantity: 1,
  //   selectedIndex: 0,
  //   orderItems: [],
  //   enterCodeDialog: false,
  //   focusedInput: undefined,
  // }),
  computed: {
    getGrandTotal: () => {
      // const grandTotal = get().orderItems.reduce(
      //   (acc, cur) => cur.subtotal! + acc,
      //   0
      // );
      // return grandTotal;
      return 123;
    },
  },
  enterCodeDialog: false,
  toggleEnterCodeDialog: () =>
    set((state) => ({ enterCodeDialog: !state.enterCodeDialog })),
  focusedInput: undefined,
  setFocusedInput: (focusedInput: "retailPrice" | "quantity" | undefined) =>
    set({ focusedInput }),
  askStartShiftDialog: false,
  setAskStartShiftDialog: (askStartShiftDialog: boolean) =>
    set({ askStartShiftDialog }),
}));
