import React from "react";
import { useNavigate } from "react-router-dom";

import client from "@/services/client";
import styled from "@emotion/styled";
import {
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
}

export const Persona: React.FC<PersonaProps> = ({
  profilePage,
  totauxPage,
}) => {
  const navigate = useNavigate();
  const { username } = useUsername();

  const personaClicked = async () => {
    if (totauxPage) {
      navigate("/options/profile");
    } else {
      navigate("/options/profile");
    }
  };

  const personaContent = (
    <AvatarWrap totaux={totauxPage}>
      <AvatarImage />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {!totauxPage ? (
          <Subtitle2Stronger>{username}</Subtitle2Stronger>
        ) : (
          <Caption1Stronger style={{ textAlign: "center" }}>
            {username}
          </Caption1Stronger>
        )}
      </div>
      {/* {!caption &&<Caption1Stronger style={{ textAlign: "center" }}>
        {username}
      </>} */}
    </AvatarWrap>
  );

  return profilePage ? (
    <>{personaContent}</>
  ) : (
    <PersonaWrap onClick={personaClicked}>{personaContent}</PersonaWrap>
  );
};
