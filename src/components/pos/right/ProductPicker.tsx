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
  min-height: fit-content;
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
  width: 100%;
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
  & span {
    text-align: center;
    white-space: pre;
    font-size: 1.3rem;
    user-select: none;
    overflow: hidden;
    max-width: fit-content;
    min-width: 100px;
    line-height: 1.8rem;
  }
  user-select: none;
`;

const ProductsStyled = styled.div`
  padding: ${tokens.spacingHorizontalL};
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20vh, 1fr));
  gap: ${tokens.spacingHorizontalL};
  min-height: fit-content;
  justify-items: center;
`;

const ProductStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
  justify-content: center;
  align-items: center;
  padding: ${tokens.spacingHorizontalL};
  width: 80%;
  max-width: unset;
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
  & span {
    text-align: center;
    white-space: prewrap;
    font-size: 1.3rem;
    user-select: none;
    overflow: hidden;
    max-width: fit-content;
    line-height: 1.8rem;
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
          <Caption1Stronger>
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

  const productsWithDummies = Array.from({ length: 20 }, (_, i) =>
    products && products[i] !== undefined ? products[i] : false
  );

  return selectedCategoryId ? (
    <MotionList style={{ overflow: "auto" }}>
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
              >
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
                style={{ opacity: 0 }}
              />
              <Caption1Stronger style={{ opacity: 0 }}>
                {"Dummy"}
              </Caption1Stronger>
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
