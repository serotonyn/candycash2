import { OrderList } from "@/components/pos/left/OrderList";
import {
  MainForm,
  ProductSelected,
} from "@/components/pos/left/ProductSelected";
import Totaux from "@/components/pos/left/Totaux";
import styled from "@emotion/styled";

import { Idle } from "./left/Idle";
import { usePosStore } from "./store";

const Wrap = styled.div<{ flexEnd: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ flexEnd }) => (flexEnd ? "end" : "space-between")};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colorNeutralBackground3};
  border-right: 1px solid ${({ theme }) => theme.colorNeutralBackground1Pressed};
  box-sizing: border-box;
`;

export const Left = () => {
  const leftShows = usePosStore((state) => state.leftShows);

  return (
    <Wrap flexEnd={leftShows === "IDLE"}>
      {leftShows === "HISTORY" ? (
        <>
          <ProductSelected />
          <OrderList />
          <Totaux />
        </>
      ) : leftShows === "CURRENT_TRANSACTION" ? (
        <>
          <ProductSelected />
          <MainForm />
          <OrderList />
          <Totaux />
        </>
      ) : (
        <>
          <Idle />
          <Totaux />
        </>
      )}
    </Wrap>
  );
};
