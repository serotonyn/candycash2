import { useState } from "react";

import ExitSign from "@/assets/icons/exit_sign.svg";
// import { useAuth } from "@/providers/UserProvider";
import client from "@/services/client";
import styled from "@emotion/styled";
import {
  Button,
  CompoundButton,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Image,
  tokens,
} from "@fluentui/react-components";

import { useCloseCloture } from "../hooks/useCloseCloture";
import { useGetActiveCloture } from "../hooks/useGetActiveCloture";
import { usePosStore } from "../pos/store";

const CompoundButtonStyled = styled(CompoundButton)`
  & > span:first-of-type {
    height: 20px;
    margin-right: 6px;
  }
  & > span:nth-of-type(2) {
    font-weight: 500;
  }
`;

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
`;

export const Logout = () => {
  const [open, setOpen] = useState(false);

  const activeCloture = usePosStore((state) => state.activeCloture);
  const setActiveCloture = usePosStore((state) => state.setActiveCloture);
  const { refetch } = useGetActiveCloture({ requestKey: "logout" });
  const { closeCloture } = useCloseCloture();

  // const { setCurrentUser } = useAuth();

  const logout = async () => {
    await client?.authStore?.clear();
    // setCurrentUser(undefined);
  };

  const onDisconnect = () => {
    if (activeCloture) {
      setOpen(true);
    } else {
      logout();
    }
  };

  const onAction = async () => {
    if (!activeCloture) return;
    try {
      await logout();
      setTimeout(() => {
        closeCloture(activeCloture?.id).then(() => {
          refetch();
          setActiveCloture(undefined);
        });
      }, 100);
    } catch (error) {
      throw "logout";
    }
  };

  return (
    <Dialog open={open}>
      <CompoundButtonStyled
        size="small"
        icon={<Image src={ExitSign} height={22} width={22} />}
        appearance="subtle"
        onClick={onDisconnect}>
        Se déconnecter
      </CompoundButtonStyled>
      <DialogSurface style={{ transitionDuration: "var(--durationUltraFast)" }}>
        <DialogBody>
          <DialogTitle> Se déconnecter</DialogTitle>
          <DialogContentStyled>
            Le shift n'a pas été terminé. Si vous continuez, vous perderez
            l'état de la balance. Souhaitez vous continuer quand même ?
          </DialogContentStyled>
          <DialogActions>
            <Button
              appearance="secondary"
              size="large"
              onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button appearance="primary" size="large" onClick={onAction}>
              Oui
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
