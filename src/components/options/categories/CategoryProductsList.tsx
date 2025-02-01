import { ProductsExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import { tokens } from "@fluentui/react-components";

import { CategoryProduct } from "./CategoryProduct";

const BoxCardWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: auto;
  height: calc(100vh - 256px);
  & > div {
    margin: ${tokens.spacingHorizontalSNudge};
  }
`;

interface CategoryProductsListProps {
  products?: ProductsExpanded[];
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
}

export const CategoryProductsList = ({
  products,
  onDelete,
  onEdit,
}: CategoryProductsListProps) => {
  return (
    <BoxCardWrap>
      {products?.map((product) => (
        <CategoryProduct
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </BoxCardWrap>
  );
};
