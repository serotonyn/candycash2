import { ProductsExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import { Image, Title3, tokens } from "@fluentui/react-components";

import { usePosStore } from "./store";

const SelectedProductName = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: ${tokens.spacingHorizontalL};
  padding: ${tokens.spacingHorizontalL};
  height: 100%;
  height: 122px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colorNeutralBackground1Pressed};
`;

const composeProductName = (product: ProductsExpanded) => {
  if (!product) return "";

  return `${product.name} [${product.code}]`;
};

const SelectedProduct = () => {
  const selectedItem = usePosStore((state) => state.selectedItem);

  return (
    <TitleContainer>
      <div>
        <Image src={selectedItem?.imgUrl} width={80} />
      </div>
      <SelectedProductName>
        <Title3>{selectedItem && composeProductName(selectedItem)}</Title3>
      </SelectedProductName>
    </TitleContainer>
  );
};

export default SelectedProduct;
