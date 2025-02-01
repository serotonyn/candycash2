import styled from "@emotion/styled";
import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

const CardStyled = styled(Card)`
  height: 72px;
  background: ${({ theme }) => theme.winBackground};
  width: calc(100% - ${tokens.spacingHorizontalSNudge});
  height: fit-content;
  box-shadow: ${({ theme }) => theme.shadow2};
  margin-left: ${tokens.spacingHorizontalSNudge};
  &:active,
  :hover {
    box-shadow: ${({ theme }) => theme.shadow2};
  }
`;

const CardHeaderStyled = styled(CardHeader)`
  padding: ${tokens.spacingVerticalXS};

  & > div:first-of-type {
    grid-row-end: 3;
  }
`;

const IconWrap = styled(CardPreview)`
  padding: ${tokens.spacingHorizontalS};
  padding-left: ${tokens.spacingHorizontalL};
`;

const CardAdd = ({ ...props }) => {
  return (
    <>
      <CardStyled orientation="horizontal" {...props}>
        <IconWrap>
          <Add24Regular />
        </IconWrap>

        <CardHeaderStyled
          header={<Text weight="semibold">{props.text}</Text>}
          action={props.Form ? props.Form : <></>}
        />
      </CardStyled>
    </>
  );
};

export default CardAdd;
