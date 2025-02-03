import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Categories from "@/assets/icons/categories.png";
import LowPrice from "@/assets/icons/low_price.svg";
import Perso from "@/assets/icons/personalization.png";
import { BackButton } from "@/components/common/BackButton";
import { Persona } from "@/components/common/Persona";
import styled from "@emotion/styled";
import { Image, Tab, TabList, tokens } from "@fluentui/react-components";

const Layout = styled.div`
  height: calc(
    100vh - ${tokens.spacingVerticalXXL} - ${tokens.spacingVerticalXXL}
  );
  padding: ${({ theme }) => theme.spacingVerticalXXL};
  display: flex;
  gap: ${tokens.spacingHorizontalXXL};
`;

const StyledTabList = styled(TabList)`
  gap: ${tokens.spacingVerticalXS};
  overflow-y: auto;
  height: calc(100vh - 240px);
`;

const StyledTab = styled(Tab)<{ selected: boolean }>`
  height: 52px;
  gap: ${tokens.spacingHorizontalS};
  background: ${({ selected, theme }) =>
    selected ? theme.winBackgroundHover : ""};
  &:hover {
    background: ${({ theme }) => theme.winBackgroundHover};
  }
  &::before {
    display: none;
  }
  &::after {
    height: 16px;
    top: ${tokens.spacingVerticalMNudge};
  }
  & span:nth-of-type(1) {
    width: 24px;
    height: 24px;
  }

  & span:nth-of-type(2) {
    color: ${tokens.colorStrokeFocus2};
    text-align: left;
    font-weight: 400;
  }
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalXXL};
  width: 278px;
  min-width: 278px;
`;

const RightWrap = styled.div`
  flex: 1;
  padding-top: ${tokens.spacingVerticalXXL};
  padding-bottom: ${tokens.spacingVerticalXXL};
`;

const Options = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const subPaths = [
    // { key: "company", label: "Informations", Icon: Stall, isAdminOnly: true },
    {
      key: "categories",
      label: "Catégories",
      Icon: Categories,
      isAdminOnly: true,
    },
    { key: "sales", label: "Ventes", Icon: LowPrice, isAdminOnly: true },
    // { key: "printer", label: "Imprimante", Icon: Printer, isAdminOnly: true },
    { key: "appearance", label: "Apparance", Icon: Perso, isAdminOnly: false },
  ];
  const selected = pathname.substring(7);
  const isSelected = (value: string) => value === selected;

  const renderTabs = () => {
    return subPaths.map((subPath) => {
      return (
        <StyledTab
          key={subPath.key}
          icon={<Image src={subPath.Icon} width={22} height={22} />}
          value={subPath.key}
          selected={isSelected(subPath.key)}
          onClick={() => navigate(`/options/${subPath.key}`)}>
          {subPath.label}
        </StyledTab>
      );
    });
  };

  return (
    <Layout>
      <LeftWrap>
        <BackButton onClick={() => navigate("/")} />
        <Persona />
        <StyledTabList
          defaultSelectedValue="categories"
          vertical
          appearance="subtle"
          selectedValue={selected}>
          {renderTabs()}
        </StyledTabList>
      </LeftWrap>
      <RightWrap>
        <Outlet />
      </RightWrap>
    </Layout>
  );
};

export default Options;
