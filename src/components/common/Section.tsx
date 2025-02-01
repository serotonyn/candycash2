import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import {
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Image,
  Text,
  tokens,
} from "@fluentui/react-components";

const CardStyled = styled(Card)<{ clickable: boolean }>`
  height: 72px;
  max-width: 100%;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.shadow2};
  background: ${({ theme }) => theme.winBackground};

  &:active,
  :hover {
    cursor: ${({ clickable }) => clickable && "pointer"};
    background: ${({ theme, clickable }) =>
      clickable && theme.winBackgroundHover};
    box-shadow: ${({ theme, clickable }) => clickable && theme.shadow2};
  }
`;

const CardHeaderStyled = styled(CardHeader)<{ hasDescription?: boolean }>`
  padding: ${tokens.spacingVerticalXS};
  ${({ hasDescription }) =>
    !hasDescription &&
    `
    & > div:first-of-type {
      grid-row-end: 3;
    }
  `}
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

const IconWrap = styled(CardPreview)`
  padding: ${tokens.spacingHorizontalS};
  padding-left: ${tokens.spacingHorizontalL};
`;

interface SectionItemProps {
  to?: string;
  rightComponent: ReactNode;
  text: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img?: any;
  icon?: ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = ({
  text,
  description,
  rightComponent,
  img,
  icon,
  to,
}) => {
  const navigate = useNavigate();

  return (
    <CardStyled
      orientation="horizontal"
      clickable={!!to}
      onClick={to ? () => navigate(to) : undefined}>
      {img && (
        <CardPreviewStyled>
          <CardImageStyled src={img} alt="App Name Document" />
        </CardPreviewStyled>
      )}
      {icon && (
        <IconWrap>
          <>{icon}</>
        </IconWrap>
      )}

      <CardHeaderStyled
        hasDescription={!!description}
        header={<Text weight="semibold">{text}</Text>}
        description={<Caption1>{description}</Caption1>}
        action={<>{rightComponent}</>}
      />
    </CardStyled>
  );
};

const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalS};
`;

interface OwnProps {
  to?: string;
  title: string;
  products: SectionItemProps[];
}

export const Section: React.FC<OwnProps> = ({ title, products }) => {
  return (
    <SectionWrap>
      <Body1Strong>{title}</Body1Strong>
      <>
        {products.map(
          ({ to, text, description, icon, img, rightComponent }) => (
            <SectionItem
              key={text}
              to={to}
              text={text}
              description={description}
              img={img}
              icon={icon}
              rightComponent={rightComponent}
            />
          )
        )}
      </>
    </SectionWrap>
  );
};
