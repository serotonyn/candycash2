import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Play from "@/assets/icons/play.svg";
import Stop from "@/assets/icons/stop.svg";
import styled from "@emotion/styled";
import {
  Button,
  Caption1,
  CompoundButton,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Image,
  Input,
  tokens,
} from "@fluentui/react-components";

import { useCloseCloture } from "../hooks/useCloseCloture";
import { useCreateCloture } from "../hooks/useCreateCloture";
import { useGetActiveCloture } from "../hooks/useGetActiveCloture";
import { useGetTopSales } from "../hooks/useGetTopSales";
import { useGetTotalTransactionsBetweenDates } from "../hooks/useGetTotalTransactionsBetweenDates";
import { usePrintCloture } from "../hooks/usePrintCloture";
import { usePosStore } from "../pos/store";

dayjs.extend(utc);

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

const ClotureForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
`;

export const Shift = () => {
  const { control } = useForm();

  const beforeLabelId = useId();
  const afterLabelId = useId();
  const beforeAndAfterId = useId();

  const [open, setOpen] = useState(false);

  const activeCloture = usePosStore((state) => state.activeCloture);
  const setActiveCloture = usePosStore((state) => state.setActiveCloture);
  const { refetch } = useGetActiveCloture({
    requestKey: "shift",
  });

  const { create } = useCreateCloture();
  const { closeCloture } = useCloseCloture();
  const [fondDeCaisse, setFondDeCaisse] = useState("20000");

  const [totalSales, setTotalSales] = useState<number | undefined>();

  const content = !activeCloture
    ? `Cela vous aidera à suivre l'argent dans votre caisse enregistreuse. Vous devez fournir le solde initial, puis commencer le shift. Après le début du shift, toutes les ventes seront ajoutées à ce solde. Vous pouvez consulter le solde en espèces à n'importe quel moment en appuyant sur le bouton 'Finir le shift'.`
    : `Solde actuel en espèces indique votre disponibilité en espèces dans votre tiroir-caisse. Pour commencer un nouveau shift de travail, vous devez d'abord fermer le shift de travail actuel en appuyant sur le bouton de fin de quart ci-dessous.`;

  const action = !activeCloture ? "Commencer le shift" : "Finir le shift";

  const onAction = () => {
    if (!activeCloture) {
      if (Number(fondDeCaisse) > 0) {
        setOpen(false);
        setTimeout(() => {
          create({
            fondDeCaisse: Number(fondDeCaisse),
          }).then(() => {
            refetch();
          });
        }, 100);
      }
    } else {
      setOpen(false);
      setTimeout(() => {
        closeCloture(activeCloture.id).then(() => {
          refetch();
          setActiveCloture(undefined);
        });
      }, 100);
    }
  };

  const { getTotal } = useGetTotalTransactionsBetweenDates();

  const onOpen = async () => {
    if (activeCloture) {
      const totalSales = await getTotal(activeCloture.created);
      setTotalSales(totalSales);
    }
    setOpen(true);
  };

  const { print: printCloture } = usePrintCloture();
  const { fetchTopSales } = useGetTopSales({
    requestKey: "shift",
  });

  const print = async () => {
    if (!activeCloture) return;
    printCloture(
      dayjs(activeCloture?.created).format("YYYY-MM-DD À HH:mm"),
      dayjs().format("YYYY-MM-DD À HH:mm"),
      String(activeCloture.fondDeCaisse),
      String(totalSales),
      String((totalSales || 0) + Number(activeCloture.fondDeCaisse)),
      await fetchTopSales()
    );
  };

  return (
    <Dialog open={open}>
      <CompoundButtonStyled
        size="small"
        icon={
          <Image src={!activeCloture ? Play : Stop} height={22} width={22} />
        }
        appearance="subtle"
        onClick={onOpen}>
        {!activeCloture ? "Commencer le shift" : "Finir le shift"}
      </CompoundButtonStyled>
      <DialogSurface style={{ transitionDuration: "var(--durationUltraFast)" }}>
        <DialogBody>
          <DialogTitle>Gestion du shift</DialogTitle>
          <DialogContentStyled>
            {content}
            {!activeCloture ? (
              <Controller
                name="fondDeCaisse"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field label="Fond de caisse">
                    <Input
                      style={{ width: "100%", fontSize: "22px" }}
                      size="large"
                      {...field}
                      value={String(fondDeCaisse)}
                      onChange={(_, { value }) => {
                        field.onChange(value);
                        setFondDeCaisse(value);
                      }}
                      type="number"
                      contentBefore={<Caption1 id={beforeLabelId}>DA</Caption1>}
                      contentAfter={<Caption1 id={afterLabelId}>.00</Caption1>}
                      id={beforeAndAfterId}
                    />
                  </Field>
                )}
              />
            ) : (
              <ClotureForm>
                <Field label="Fond de caisse" size="large">
                  <Input
                    style={{ width: "100%", fontSize: "22px" }}
                    defaultValue={String(activeCloture.fondDeCaisse)}
                    contentBefore={<Caption1>DA</Caption1>}
                    contentAfter={<Caption1>.00</Caption1>}
                    readOnly
                  />
                </Field>
                <Field
                  label={`Total ventes (depuis ${dayjs(
                    activeCloture.created
                  ).format("dddd DD MMMM YYYY À HH:mm")})`}
                  size="large">
                  <Input
                    defaultValue={String(totalSales)}
                    style={{ width: "100%", fontSize: "22px" }}
                    contentBefore={<Caption1>DA</Caption1>}
                    contentAfter={<Caption1>.00</Caption1>}
                    readOnly
                  />
                </Field>
                <Field label="Cloture balance" size="large">
                  <Input
                    defaultValue={String(
                      (totalSales || 0) + activeCloture.fondDeCaisse
                    )}
                    style={{ width: "100%", fontSize: "22px" }}
                    contentBefore={<Caption1>DA</Caption1>}
                    contentAfter={<Caption1>.00</Caption1>}
                    readOnly
                  />
                </Field>
              </ClotureForm>
            )}
          </DialogContentStyled>
          <DialogActions>
            <Button
              appearance="secondary"
              size="large"
              onClick={() => setOpen(false)}>
              Annuler
            </Button>
            {activeCloture && (
              <Button appearance="secondary" size="large" onClick={print}>
                Imprimer
              </Button>
            )}
            <Button appearance="primary" size="large" onClick={onAction}>
              {action}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
