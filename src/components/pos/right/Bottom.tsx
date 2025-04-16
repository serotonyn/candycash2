/* eslint-disable @typescript-eslint/ban-ts-comment */

import CashRegister from '@/assets/icons/cash_register.svg';
import DeleteReceipt from '@/assets/icons/delete_receipt.svg';
import PrintIcon from '@/assets/icons/printer.png';
import ReceiptApproved from '@/assets/icons/receipt_approved.svg';
import RestartIcon from '@/assets/icons/restart.png';
import { useOpenCashier } from '@/components/hooks/useOpenCashier';
import { usePay } from '@/components/hooks/usePay';
import { usePayWithNoPrint } from '@/components/hooks/usePayWithNoPrint';
import { usePrint } from '@/components/hooks/usePrint';
import { usePosStore } from '@/components/pos/store';
import styled from '@emotion/styled';
import { Button, Image, tokens } from '@fluentui/react-components';

const BottomStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  min-height: fit-content;
  padding: ${tokens.spacingVerticalL};
`;

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: ${tokens.spacingHorizontalS};
  align-items: normal;
  height: fit-content;
  border-top: 1px solid ${({ theme }) => theme.colorNeutralBackground1Pressed};
  padding: ${tokens.spacingVerticalL};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colorNeutralBackground3};
  overflow: auto;
  border-radius: 10px;
  & > button {
    flex: 1;
  }
`;

const ButtonStyled = styled(Button)`
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacingHorizontalL};
  gap: ${tokens.spacingHorizontalL};
  & > span:first-of-type {
    margin-right: 0;
  }
  min-width: 100px;
  white-space: nowrap;
`;

// @ts-ignore
const ButtonTextOrIcon = (props) => {
  return (
    <ButtonStyled
      {...props}
      appearance={props.mainButton ? "primary" : "secondary"}>
      {props.text}
    </ButtonStyled>
  );
};

const PayButton = () => {
  const { pay } = usePay();
  const orderItems = usePosStore((state) => state.orderItems);
  const leftShows = usePosStore((state) => state.leftShows);

  const active = orderItems.length && leftShows === "CURRENT_TRANSACTION";
  return (
    <ButtonTextOrIcon
      appearance={active ? "primary" : "secondary"}
      onClick={pay}
      icon={<Image src={ReceiptApproved} width={70} />}
      disabled={!active}
    />
  );
};

const PayWithNoPrint = () => {
  const { payWithNoPrint } = usePayWithNoPrint();
  const orderItems = usePosStore((state) => state.orderItems);
  const leftShows = usePosStore((state) => state.leftShows);

  const active = orderItems.length && leftShows === "CURRENT_TRANSACTION";

  return (
    <ButtonTextOrIcon
      appearance={active ? "primary" : "secondary"}
      onClick={payWithNoPrint}
      icon={<Image src={DeleteReceipt} width={70} />}
      disabled={!active}
    />
  );
};

export const Bottom = () => {
  const { reset } = usePosStore();

  const { print } = usePrint();
  const orderItems = usePosStore((state) => state.orderItems);
  const { openCashier } = useOpenCashier();

  return (
    <BottomStyled>
      <ButtonsWrap>
        <ButtonTextOrIcon
          onClick={reset}
          text="Redémarrer"
          icon={<Image src={RestartIcon} width={28} />}
        />
        {!orderItems.length ? (
          <ButtonTextOrIcon
            onClick={openCashier}
            text="Ouvrir Caisse"
            icon={<Image src={CashRegister} width={28} />}
          />
        ) : (
          <ButtonTextOrIcon
            onClick={print}
            text="Imprimer"
            icon={<Image src={PrintIcon} width={28} />}
          />
        )}
        <PayWithNoPrint />
        <PayButton />
      </ButtonsWrap>
    </BottomStyled>
  );
};
