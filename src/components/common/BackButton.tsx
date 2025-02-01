import styled from "@emotion/styled";
import { Button, Caption1, tokens } from "@fluentui/react-components";
import { ArrowLeft16Regular } from "@fluentui/react-icons";

const BackButtonStyled = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  gap: ${tokens.spacingHorizontalM};
`;

export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <BackButtonStyled>
    <Button
      appearance="subtle"
      icon={<ArrowLeft16Regular />}
      onClick={onClick}
    />
    <Caption1>Retour</Caption1>
  </BackButtonStyled>
);
