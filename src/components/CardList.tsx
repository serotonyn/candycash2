import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  CategoriesExpanded,
  ProductsExpanded,
  UsersExpanded,
} from "@/types/expanded";

import { CardListItem } from "./CardListItem";

export type Entity = CategoriesExpanded | ProductsExpanded | UsersExpanded;

interface CardListProps {
  subPath?: "categories";
  entities?: Entity[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  additionalActions?: (id: string) => ReactNode;
  imgPlaceholder?: string;
  header?: (entity: Entity) => ReactNode;
  description?: (entity: Entity) => string;
  onClick?: () => void;
}

const CardList = (props: CardListProps) => {
  const navigate = useNavigate();
  return props.entities?.map((c) => (
    <CardListItem
      key={c.id}
      {...(props.subPath
        ? {
            onClick: () => navigate(`/options/${props.subPath}/${c.id}`),
          }
        : {})}
      entity={c}
      header={props.header}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
      additionalActions={props.additionalActions}
      imgPlaceholder={props.imgPlaceholder}
    />
  ));
};

export default CardList;
