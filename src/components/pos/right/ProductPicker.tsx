import { Dispatch, SetStateAction, useState } from "react";

import Categories from "@/assets/icons/categories.png";
import PlaceHolder from "@/assets/product-placeholder.png";
import { MotionList } from "@/components/common/MotionList";
import { useAddOrderItem } from "@/components/hooks/useAddOrderItem";
import { useGetCategories } from "@/components/hooks/useGetCategories";
import { useGetProducts } from "@/components/hooks/useGetProducts";
import { usePosStore } from "@/components/pos/store";
import styled from "@emotion/styled";
import { Caption1Stronger, Image, tokens } from "@fluentui/react-components";

const CategoriesStyled = styled.div`
  padding: ${tokens.spacingHorizontalL};
  display: flex;
  align-items: start;
  gap: ${tokens.spacingHorizontalL};
  height: 20%;
  overflow-x: auto;
  overflow-y: hidden;
`;

const CategoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
  padding: ${tokens.spacingHorizontalS};
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.winBackgroundHover};
    border-radius: ${tokens.borderRadiusMedium};
  }
  & img {
    min-width: 5vh;
    min-height: 5vh;
    width: 5vh;
    height: 5vh;
  }
  & #placeholder {
    width: 4vh;
    height: 4vh;
  }
  user-select: none;
`;

const ProductsStyled = styled.div`
  padding: ${tokens.spacingHorizontalL};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${tokens.spacingHorizontalL};
  height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
  user-select: none;
`;

const ProductStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.winBackgroundHover};
    border-radius: ${tokens.borderRadiusMedium};
  }
  & img {
    width: 5vh;
    height: 5vh;
  }
  & #placeholder {
    width: 4vh;
    height: 4vh;
  }
`;

export const ProductPicker = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  return (
    <>
      <CategoryPicker setSelectedCategoryId={setSelectedCategoryId} />
      <ProductsCarousel selectedCategoryId={selectedCategoryId} />
    </>
  );
};

interface CategoriesPicker {
  setSelectedCategoryId: Dispatch<SetStateAction<string | null>>;
}

const CategoryPicker = ({ setSelectedCategoryId }: CategoriesPicker) => {
  const { categories } = useGetCategories({ requestKey: "product_picker" });

  return categories ? (
    <CategoriesStyled>
      {categories.map((s) => (
        <CategoryStyled key={s.id} onClick={() => setSelectedCategoryId(s.id)}>
          <Image src={s.imgUrl || Categories} width={80} height={80} />
          <Caption1Stronger
            style={{
              textAlign: "center",
              whiteSpace: "pre",
              fontSize: "1.3rem",
              userSelect: "none",
            }}>
            {s.name}
          </Caption1Stronger>
        </CategoryStyled>
      ))}
    </CategoriesStyled>
  ) : null;
};

interface ProductsPicker {
  selectedCategoryId: string | null;
}

const ProductsCarousel = ({ selectedCategoryId }: ProductsPicker) => {
  const setSelectedItem = usePosStore((state) => state.setSelectedItem);
  const setQuantity = usePosStore((state) => state.setQuantity);
  const { addOrderItem } = useAddOrderItem();

  const { products } = useGetProducts({
    filter: `category = "${selectedCategoryId}"`,
    requestKey: "products-carousel",
  });

  const onItemClick = (id: string) => {
    const product = products?.find((s) => s.id === id);
    if (!product) return;
    setQuantity(`1`);
    setSelectedItem(product);
    addOrderItem(product);
  };

  const productsWithDummies = Array.from({ length: 16 }, (_, i) =>
    products && products[i] !== undefined ? products[i] : false
  );

  return selectedCategoryId ? (
    <MotionList>
      <ProductsStyled>
        {productsWithDummies.map((s, i) =>
          s ? (
            <ProductStyled key={s.id} onClick={() => onItemClick(s.id)}>
              <Image
                src={s.imgUrl || Categories}
                width={80}
                height={80}
                fit="contain"
              />
              <Caption1Stronger
                style={{
                  textAlign: "center",
                  fontSize: "1.3rem",
                  userSelect: "none",
                }}>
                {s.name}
              </Caption1Stronger>
            </ProductStyled>
          ) : (
            <ProductStyled key={i}>
              <Image
                src={PlaceHolder}
                width={20}
                height={20}
                id="placeholder"
              />
            </ProductStyled>
          )
        )}
        {/* <ProductStyled onClick={() => setSelectedCategoryId(null)}>
          <ArrowReply48Filled />
        </ProductStyled> */}
      </ProductsStyled>
    </MotionList>
  ) : null;
};
