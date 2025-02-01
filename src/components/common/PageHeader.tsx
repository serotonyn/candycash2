import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Title2,
  tokens,
} from "@fluentui/react-components";

import { BackButton } from "./BackButton";

const Wrap = styled.div``;

const CrumbWrap = styled.div`
  display: flex;
  align-items: center;
`;

const BreadcrumbButtonStyled = styled(BreadcrumbButton)`
  height: initial;
  &:hover {
    background: initial;
  }
  &:active {
    background: initial;
  }
`;

const CrumbName = styled(Title2)<{ current: boolean }>`
  color: ${({ current }) => (current ? tokens.colorNeutralForeground1 : "")};
`;

interface PageHeaderProps {
  list: {
    title: string;
    to: string;
    current: boolean;
  }[];
  back?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ list, back }) => {
  const navigate = useNavigate();

  const isLastItem = (index: number) => list.length === index + 1;

  return (
    <Wrap>
      {back && <BackButton onClick={back} />}
      <Breadcrumb>
        {list.map(({ title, to, current }, i) => (
          <CrumbWrap key={title}>
            <BreadcrumbItem>
              <BreadcrumbButtonStyled
                current={current}
                onClick={() => navigate(to)}>
                <CrumbName current={current}>{title}</CrumbName>
              </BreadcrumbButtonStyled>
            </BreadcrumbItem>
            {!isLastItem(i) && <BreadcrumbDivider />}
          </CrumbWrap>
        ))}
      </Breadcrumb>
    </Wrap>
  );
};

export default PageHeader;
