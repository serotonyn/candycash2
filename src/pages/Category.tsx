import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";

import CardAdd from "@/components/common/CardAdd";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { MotionList } from "@/components/common/MotionList";
import { useGetNextProductCode } from "@/components/hooks/useGetNextProductCode";
import { useGetProducts } from "@/components/hooks/useGetProducts";
import { CategoryProductsList } from "@/components/options/categories/CategoryProductsList";
import { ProductForm } from "@/components/options/products/ProductForm";
import { Collections, ProductsResponse } from "@/pocketbase-types";
import client from "@/services/client";
import { ProductsExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import { Button, DialogTrigger, tokens } from "@fluentui/react-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
`;

const Category = () => {
  const { categoryId } = useParams();
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductsExpanded>();

  const { products, refetch } = useGetProducts({
    filter: `category = "${categoryId}"`,
    requestKey: "products",
  });

  const { nextProductCode, refetchNextCode } = useGetNextProductCode();

  const remove = async () => {
    if (!product) return;
    await client?.collection(Collections.Products).delete(product.id);
    setDeleteDialogOpen(false);
    refetch();
  };

  const onDelete = async (id: string) => {
    const product = products.find((product) => product.id === id);
    if (!product) return;
    setProduct(product);
    setDeleteDialogOpen(true);
  };

  const onEdit = (itemId: string) => {
    const product = products?.find((product) => product.id === itemId);
    if (!product) return;
    setProduct(product);
    setEditDialogOpen(true);
  };

  const edit = async (data: FieldValues) => {
    if (!product) return;
    await client?.collection(Collections.Products).update(product?.id, data);
    await refetch();
    setProduct(undefined);
  };

  const create = async (data: FieldValues) => {
    try {
      await client
        ?.collection(Collections.Products)
        .create<ProductsResponse>({ ...data, category: categoryId });
      await refetch();
      await refetchNextCode();
      console.log(nextProductCode);
    } catch (error) {
      throw "failed to create a product";
    }
  };

  // const notify = ({ name }: { name: string }) =>

  //   dispatchToast(
  //     <Toast>
  //       <ToastTitle>Succès</ToastTitle>
  //       <ToastBody>Nouvelle catégorie "{name}" ajoutée</ToastBody>
  //     </Toast>,
  //     { intent: "success" }

  return (
    <Wrap>
      <MotionList>
        <CardAdd
          text="Ajouter un nouvel article"
          categoryId={categoryId}
          refetch={refetch}
          Form={
            <ProductForm
              trigger={
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" size="large">
                    Ajouter
                  </Button>
                </DialogTrigger>
              }
              open={createDialogOpen}
              setOpen={setCreateDialogOpen}
              text={"Ajouter un nouvel article"}
              onSubmitted={create}
              nextProductCode={nextProductCode}
            />
          }></CardAdd>

        <CategoryProductsList
          products={products}
          onDelete={onDelete}
          onEdit={onEdit}
        />

        {product && editDialogOpen && (
          <ProductForm
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            text={"Modifier un article"}
            product={product}
            onSubmitted={edit}
          />
        )}
      </MotionList>
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        confirm={remove}
      />
    </Wrap>
  );
};

export default Category;
