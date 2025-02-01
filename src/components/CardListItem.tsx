import { ReactNode, SyntheticEvent } from "react";

import {
  CategoriesExpanded,
  ProductsExpanded,
  UsersExpanded,
} from "@/types/expanded";
import styled from "@emotion/styled";
import {
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Image,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Delete20Regular, Edit20Regular } from "@fluentui/react-icons";

import { Entity } from "./CardList";

const CardStyled = styled(Card)<{ clickable: boolean }>`
  min-height: 72px;
  max-width: 100%;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.shadow2};
  background: ${({ theme }) => theme.winBackground};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};
  &:active,
  :hover {
    background: ${({ theme }) => theme.winBackgroundHover};
    box-shadow: ${({ theme }) => theme.shadow2};
  }
`;

const CardHeaderStyled = styled(CardHeader)<{ hasDesc?: boolean }>`
  padding: ${tokens.spacingVerticalXS};

  & > div:first-of-type {
    grid-row-end: 3;
    grid-row-end: ${({ hasDesc }) => (hasDesc ? 2 : 3)};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalS};
`;

const CardPreviewStyled = styled(CardPreview)`
  width: 44px;
  height: 44px;
  padding: ${tokens.spacingHorizontalS};
  padding-left: ${tokens.spacingHorizontalL};
`;

const CardImageStyled = styled(Image)`
  width: 44px;
  height: 44px;
`;

const DescriptionStyled = styled(Caption1)`
  overflow-x: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
  text-wrap: nowrap;
`;

interface OwnProps {
  entity: Entity;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClick?: () => void;
  header?: (entity: Entity) => ReactNode;
  description?: (entity: Entity) => string;
  additionalActions?: (id: string) => ReactNode;
  imgPlaceholder?: string;
}

export const CardListItem = ({
  onClick,
  entity,
  onDelete,
  onEdit,
  header,
  description,
  additionalActions,
  imgPlaceholder,
}: OwnProps) => {
  const onDeleteClicked = (event: SyntheticEvent) => {
    event.stopPropagation();
    onDelete(entity.id);
  };

  const onEditClicked = (event: SyntheticEvent) => {
    event.stopPropagation();
    onEdit(entity.id);
  };

  return (
    <CardStyled
      clickable={!!onClick}
      orientation="horizontal"
      onClick={onClick}>
      {((entity as CategoriesExpanded | ProductsExpanded | UsersExpanded)
        .imgUrl ||
        imgPlaceholder) && (
        <CardPreviewStyled>
          <CardImageStyled
            src={
              (entity as CategoriesExpanded | ProductsExpanded | UsersExpanded)
                .imgUrl || imgPlaceholder
            }
            alt="App Name Document"
          />
        </CardPreviewStyled>
      )}

      <CardHeaderStyled
        hasDesc={!!description}
        header={
          header ? (
            (header(entity) as any)
          ) : (
            <Text weight="semibold">
              {
                (
                  entity as
                    | CategoriesExpanded
                    | ProductsExpanded
                    | UsersExpanded
                ).name as string
              }
            </Text>
          )
        }
        description={
          <DescriptionStyled>
            {description && description(entity)}
          </DescriptionStyled>
        }
        action={
          <Actions>
            {additionalActions && additionalActions(entity.id)}
            <Button
              appearance="outline"
              size="large"
              icon={<Delete20Regular />}
              aria-label="More options"
              onClick={onDeleteClicked}
            />
            <Button
              appearance="outline"
              size="large"
              icon={<Edit20Regular />}
              onClick={onEditClicked}
            />
          </Actions>
        }
      />
    </CardStyled>
  );
};
