import { Outlet, useLocation } from "react-router-dom";

import { MotionList } from "@/components/common/MotionList";
import PageHeader from "@/components/common/PageHeader";
import { Persona } from "@/components/common/Persona";
import { Section } from "@/components/common/Section";
import { Logout } from "@/components/options/Logout";
import { Shift } from "@/components/options/Shift";
import styled from "@emotion/styled";
import { Button, tokens } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXXXL};
`;

const Actions = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalS};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = () => {
  const headerList = [
    {
      title: "Profile",
      to: "/options/profile",
      current: true,
    },
  ];

  const pathLength = useLocation().pathname.split("/").filter(Boolean).length;

  const renderProfile = (
    <>
      <PageHeader list={headerList} />
      <MotionList>
        <Row>
          <Persona profilePage />
          <Actions>
            <Shift />
            <Logout />
          </Actions>
        </Row>
        <Section
          title="Mettre à jour votre photo"
          products={[
            {
              text: "Prendre une photo",
              icon: <Add24Regular />,
              rightComponent: (
                <Actions>
                  <Button appearance="outline">Camera</Button>
                </Actions>
              ),
            },
          ]}
        />
      </MotionList>
    </>
  );

  return <Wrap>{pathLength < 3 ? renderProfile : <Outlet />}</Wrap>;
};

export default Profile;
