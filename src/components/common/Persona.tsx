import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UsersResponse } from "@/pocketbase-types";
// import { useAuth } from "@/providers/UserProvider";
import client from "@/services/client";
import styled from "@emotion/styled";
import {
  Body1,
  Caption1Stronger,
  Subtitle2Stronger,
  tokens,
} from "@fluentui/react-components";

import { AvatarImage } from "./Avatar";
import { useUsername } from "../hooks/useUsername";

const PersonaWrap = styled.div`
  padding: ${tokens.spacingHorizontalS} ${tokens.spacingHorizontalM};
  border-radius: ${tokens.borderRadiusMedium};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.winBackgroundHover};
  }
  &:active {
    background: ${({ theme }) => theme.colorNeutralBackground1Pressed};
  }
`;

const AvatarWrap = styled.div<{ totaux?: boolean }>`
  display: flex;
  flex-direction: ${({ totaux }) => (totaux ? "column" : "row")};
  align-items: center;
  gap: ${tokens.spacingHorizontalL};
`;

interface PersonaProps {
  profilePage?: boolean;
  totauxPage?: boolean;
  caption?: boolean;
}

export const Persona: React.FC<PersonaProps> = ({
  profilePage,
  totauxPage,
  caption,
}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>(undefined);
  const { username } = useUsername();
  // const { currentUser } = useAuth();

  const getUrl = async (currentUser: UsersResponse) => {
    return client?.files.getURL(currentUser, currentUser.avatar);
  };

  // useEffect(() => {
  //   if (!currentUser) return;

  //   getUrl(currentUser).then(setImage);
  // }, [currentUser]);

  const personaClicked = async () => {
    if (totauxPage) {
      navigate("/options/profile");
    } else {
      navigate("/options/profile");
    }
  };

  const personaContent = (
    <AvatarWrap totaux={totauxPage}>
      <AvatarImage image={image} />

      {!totauxPage && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Subtitle2Stronger>
            {client?.authStore?.model?.name}
          </Subtitle2Stronger>
          <Body1>
            {client?.authStore?.model?.isAdmin ? "Administrateur" : "Vendeur"}
          </Body1>
        </div>
      )}
      {caption && (
        <Caption1Stronger style={{ textAlign: "center" }}>
          {username}
        </Caption1Stronger>
      )}
    </AvatarWrap>
  );

  return profilePage ? (
    <>{personaContent}</>
  ) : (
    <PersonaWrap onClick={personaClicked}>{personaContent}</PersonaWrap>
  );
};
