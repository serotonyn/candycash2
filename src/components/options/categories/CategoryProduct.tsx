import { SyntheticEvent } from "react";

import ProductPlaceHolder from "@/assets/product-placeholder.png";
import { ProductsExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardHeader,
  CardPreview,
  Image,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Delete16Regular } from "@fluentui/react-icons";

const CardStyled = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 180px;
  height: 200px !important;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.shadow2};
  background: ${({ theme }) => theme.winBackground};
  &:active,
  :hover {
    box-shadow: ${({ theme }) => theme.shadow2};
    background: ${({ theme }) => theme.winBackgroundHover};
  }
`;

const CardHeaderStyled = styled(CardHeader)`
  padding: ${tokens.spacingVerticalXS};
  & span {
    width: 100%;
    text-align: center;
  }
  max-width: 120px;
`;

const CardPreviewStyled = styled(CardPreview)`
  width: 54px;
  height: 54px;
  padding: ${tokens.spacingHorizontalS};
`;

const CardImageStyled = styled(Image)`
  width: 54px;
  height: 54px;
`;

const FloatingButtons = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalS};
`;

interface CategoryProductProps {
  product: ProductsExpanded;
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
}

export const CategoryProduct = (props: CategoryProductProps) => {
  const onDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
    props.onDelete(props.product.id);
  };
  const onEdit = (event: SyntheticEvent) => {
    event.stopPropagation();
    props.onEdit(props.product.id);
  };

  return (
    <CardStyled onClick={onEdit}>
      <FloatingButtons>
        <Button
          size="large"
          appearance="outline"
          icon={<Delete16Regular />}
          onClick={onDelete}
        />
      </FloatingButtons>
      <CardPreviewStyled>
        <CardImageStyled
          src={props.product.imgUrl || ProductPlaceHolder}
          alt="App Name Document"
        />
      </CardPreviewStyled>

      <CardHeaderStyled
        header={<Text weight="semibold">{props.product.name}</Text>}
      />
    </CardStyled>
  );
};
