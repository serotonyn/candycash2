import { useEffect, useId, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { useDeleteOrderItem } from "@/components/hooks/useDeleteOrderItem";
import styled from "@emotion/styled";
import {
  Button,
  Caption1,
  Field,
  Input,
  tokens,
} from "@fluentui/react-components";
import {
  Delete16Regular,
  Delete24Filled,
  Dismiss24Filled,
} from "@fluentui/react-icons";

import SelectedProduct from "../SelectedProduct";
import { usePosStore } from "../store";
import { TransactionInfo } from "../TransactionInfo";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 122px;
`;

const Container = styled.div`
  padding: ${tokens.spacingHorizontalL};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalS};
  width: 100%;
  max-width: 505px;
`;

const FormAndButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding: ${tokens.spacingHorizontalL};

  & > div {
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingHorizontalS};
  }
  display: none;
  @media (min-width: 1450px) {
    display: flex;
    max-width: 505px;
  }
`;

const InputsRow = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalS};
  max-width: 505px;
`;

const FieldStyled = styled(Field)<{ width: string }>`
  width: ${({ width }) => width};
  & > label {
    width: ${({ width }) => width};
  }
  & > span {
    width: ${({ width }) => width};
  }
`;

const ProductButtons = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalS};
  @media (min-width: 1450px) {
    display: none;
  }
`;

const ProductRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${tokens.spacingHorizontalL};
  justify-content: space-between;

  & > div:first-of-type {
    width: 100%;
  }
`;
export const ProductSelected = () => {
  return (
    <Wrap>
      <Header />
    </Wrap>
  );
};

const Header = () => {
  const leftShows = usePosStore((state) => state.leftShows);

  return leftShows === "CURRENT_TRANSACTION" ? (
    <SelectedProduct />
  ) : (
    <TransactionInfo />
  );
};

export const MainForm = () => {
  const { control } = useForm();
  const retailPriceRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const retailPriceBeforeAndAfterId = useId();
  const retailPriceBeforeLabelId = useId();
  const retailPriceAfterLabelId = useId();

  const selectedIndex = usePosStore((state) => state.selectedIndex);
  const selectedItem = usePosStore((state) => state.selectedItem);

  const setRetailPrice = usePosStore((state) => state.setRetailPrice);
  const retailPrice = usePosStore((state) => state.retailPrice);
  const quantity = usePosStore((state) => state.quantity);
  const setQuantity = usePosStore((state) => state.setQuantity);
  const setSelectedIndex = usePosStore((state) => state.setSelectedIndex);

  useEffect(() => {
    if (!selectedItem) return;
    setRetailPrice(String(selectedItem.salePrice));
  }, [selectedItem]);

  const { deleteOrderItem } = useDeleteOrderItem();

  const setFocusedInput = usePosStore((state) => state.setFocusedInput);

  const onFocus = (name: "retailPrice" | "quantity") => {
    setFocusedInput(name);
  };

  const deselect = () => {
    setSelectedIndex(undefined);
  };

  return selectedIndex ? (
    <FormAndButtons>
      <Container>
        <ProductRow>
          <Controller
            name="retailPrice"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Field label="Prix details">
                <Input
                  style={{ width: "100%", fontSize: "22px" }}
                  size="large"
                  {...field}
                  value={String(retailPrice)}
                  onChange={(_, { value }) => {
                    field.onChange(value);
                    setRetailPrice(value);
                  }}
                  type="number"
                  contentBefore={
                    <Caption1 id={retailPriceBeforeLabelId}>DA</Caption1>
                  }
                  contentAfter={
                    <Caption1 id={retailPriceAfterLabelId}>.00</Caption1>
                  }
                  id={retailPriceBeforeAndAfterId}
                  onFocus={() => onFocus(field.name)}
                  ref={retailPriceRef}
                />
              </Field>
            )}
          />
          <ProductButtons>
            <Button
              size="large"
              icon={<Dismiss24Filled />}
              onClick={deselect}
            />
            <Button
              size="large"
              icon={<Delete24Filled />}
              disabled={selectedIndex === undefined}
              onClick={deleteOrderItem}
            />
          </ProductButtons>
        </ProductRow>

        <>
          <InputsRow>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <FieldStyled label="Quantité" width="163px">
                  <Input
                    size="large"
                    style={{ fontSize: "22px" }}
                    {...field}
                    value={String(quantity)}
                    onChange={(_, { value }) => {
                      field.onChange(value);
                      setQuantity(value);
                    }}
                    type="number"
                    onFocus={() => onFocus(field.name)}
                    ref={quantityRef}
                  />
                </FieldStyled>
              )}
            />
          </InputsRow>
        </>
      </Container>

      <RightContainer>
        <div>
          <Button size="large" icon={<Dismiss24Filled />} onClick={deselect}>
            Désélectionner
          </Button>
          <Button
            size="large"
            disabled={selectedIndex === undefined}
            icon={<Delete16Regular />}
            onClick={deleteOrderItem}>
            Supprimer
          </Button>
        </div>
      </RightContainer>
    </FormAndButtons>
  ) : null;
};
