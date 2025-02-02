import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";

import { useCreateCloture } from "../hooks/useCreateCloture";
import { usePosStore } from "./store";

dayjs.extend(utc);

export const AskStartShiftDialog = () => {
  const askStartShiftDialog = usePosStore((state) => state.askStartShiftDialog);
  const setAskStartShiftDialog = usePosStore(
    (state) => state.setAskStartShiftDialog
  );

  const { create } = useCreateCloture();
  const setActiveCloture = usePosStore((store) => store.setActiveCloture);

  const onSubmit = () => {
    create({
      fondDeCaisse: 20000,
    }).then((createCloture) => {
      setActiveCloture(createCloture);
      setAskStartShiftDialog(false);
    });
  };

  return (
    <Dialog open={askStartShiftDialog}>
      <DialogSurface
        mountNode={document.querySelector("#main")}
        style={{ transitionDuration: "var(--durationUltraFast)" }}>
        <DialogBody>
          <DialogTitle>Attention shift non commencé</DialogTitle>
          <DialogContent>
            Si vous poursuivez votre opération les ventes que vous ferez ne
            seront pas comptabilisées. Cliquez sur démarrer le shift pour
            commencer le shift avec 20000 DA en fond de caisse.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                onClick={() => setAskStartShiftDialog(false)}>
                Annuler
              </Button>
            </DialogTrigger>
            <Button type="submit" appearance="primary" onClick={onSubmit}>
              Démarrer le shift
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
