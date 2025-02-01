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

interface OwnProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirm: () => void;
}

export const DeleteDialog = ({ open, setOpen, confirm }: OwnProps) => {
  return (
    <Dialog open={open}>
      <DialogSurface
        mountNode={document.querySelector("#main")}
        style={{ transitionDuration: "var(--durationUltraFast)" }}>
        <DialogBody>
          <DialogTitle>Supprimer</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir procéder à la suppression ?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Annuler
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={confirm}>
              Confirmer
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
