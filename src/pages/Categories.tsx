import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Outlet, useMatch, useParams } from "react-router-dom";

import CategoriesPlaceholderImg from "@/assets/icons/categories.png";
import CardList from "@/components/CardList";
import CardAdd from "@/components/common/CardAdd";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { MotionList } from "@/components/common/MotionList";
import PageHeader from "@/components/common/PageHeader";
import { useGetCategories } from "@/components/hooks/useGetCategories";
import { CategoryForm } from "@/components/options/categories/CategoryForm";
import {
  CategoriesResponse,
  Collections,
  ProductsResponse,
} from "@/pocketbase-types";
import client from "@/services/client";
import { CategoriesExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import {
  Button,
  DialogTrigger,
  Text,
  tokens,
} from "@fluentui/react-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
  height: calc(100vh - 256px);
  overflow-y: auto;
  padding: ${tokens.spacingVerticalSNudge};
`;

const Categories = () => {
  const { categoryId } = useParams();
  const isInCategory = !!useMatch("/options/categories/:categoryId");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoriesExpanded>();

  const { categories, refetch } = useGetCategories({
    requestKey: "categories",
  });

  const headerList = [
    {
      title: "Categories",
      to: "/options/categories",
      current: false,
    },
  ];
  if (categoryId) {
    headerList.push({
      title: categories?.find((c) => c.id === categoryId)?.name || "",
      to: `/options/categories/${categoryId}`,
      current: true,
    });
  }

  const create = (data: FieldValues) => {
    return client
      ?.collection(Collections.Categories)
      .create<CategoriesResponse>(data);
  };

  const remove = async () => {
    if (!category) return;
    await client?.collection(Collections.Categories).delete(category.id);
    setDeleteDialogOpen(false);
    refetch();
  };

  const onDelete = async (id: string) => {
    const category = categories.find((category) => category.id === id);
    if (!category) return;
    setCategory(category);
    setDeleteDialogOpen(true);
  };

  const onEdit = (id: string) => {
    const category = categories?.find((category) => category.id === id);
    if (!category) return;
    setCategory(category);
    setEditDialogOpen(true);
  };

  const edit = async (data: FieldValues) => {
    if (!category) return;
    await client?.collection(Collections.Categories).update(category?.id, {
      ...data,
    });
    setCategory(undefined);
  };

  return (
    <Wrap>
      <PageHeader list={headerList} />

      <MotionList>
        {!isInCategory ? (
          <>
            <CardAdd
              text="Ajouter une nouvelle catégorie"
              refetch={refetch}
              Form={
                <CategoryForm
                  trigger={
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="primary" size="large">
                        Ajouter
                      </Button>
                    </DialogTrigger>
                  }
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  text={"Ajouter une nouvelle categorie"}
                  onSubmitted={create}
                  refetch={refetch}
                />
              }
            />

            <ListContainer>
              <CardList
                entities={categories}
                header={(entity) => (
                  <Text weight="semibold">
                    {(entity as CategoriesExpanded).name}
                  </Text>
                )}
                description={(entity) =>
                  (entity as CategoriesExpanded).expand?.["products(category)"]
                    ?.map((i: ProductsResponse) => i.name)
                    .join(", ") || ""
                }
                onDelete={onDelete}
                onEdit={onEdit}
                subPath="categories"
                imgPlaceholder={CategoriesPlaceholderImg}
              />
            </ListContainer>
          </>
        ) : (
          <Outlet />
        )}

        {category && (
          <CategoryForm
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            text={"Modifier une catégorie"}
            category={category}
            setCategory={setCategory}
            onSubmitted={edit}
            refetch={refetch}
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

export default Categories;
