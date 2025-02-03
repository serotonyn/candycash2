import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import { useGetCompany } from "@/components/hooks/useGetCompany";
import { CodeBox } from "@/constants/default-avatar";
import styled from "@emotion/styled";
import {
  Button,
  Caption1,
  Caption1Strong,
  Card,
  Image,
  Text,
  Title1,
  tokens,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  ProgressBarProps,
  Field,
  ProgressBar,
} from "@fluentui/react-components";
import {
  ArrowClockwiseDashes24Regular,
  Box24Regular,
} from "@fluentui/react-icons";
import { useGetVersion } from "@/components/hooks/useGetVersion";
import { useCheckUpdate } from "@/components/hooks/useCheckUpdate";

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${tokens.spacingHorizontalL};
  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalS};
    align-items: center;
  }
`;

const CardImageStyled = styled(Image)`
  width: 244px;
  height: 244px;
  object-fit: contain;
`;

const DateAndTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageStyled = styled(Image)`
  width: 24px;
  height: 24px;
`;

const Box = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingIcon = styled(ArrowClockwiseDashes24Regular)`
  animation: spin 2s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Idle = () => {
  const [logo, setLogo] = useState(null);
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format("HH:mm:ss")
  );
  const { fetch: fetchCompany } = useGetCompany({ requestKey: "idle" });
  const { version } = useGetVersion();
  const { check, error, loading, updateData, reset } = useCheckUpdate();

  const [_, setDialogOpen] = useState<boolean>(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedMB, setDownloadedMB] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [contentLengthMB, setContentLengthMB] = useState(0);
  const downloaded = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchLogo = async () => {
    const company = await fetchCompany();
    if (company) {
      setLogo(company.imgUrl);
    }
  };

  useEffect(() => {
    if (!logo) {
      fetchLogo();
    }
  }, []);

  const cancel = () => {
    setDialogOpen(false);
    reset();
  };

  const retry = () => {
    reset();
    check();
  };

  const confirm = async () => {
    if (!updateData) return;
    setIsDownloading(true);
    await updateData.downloadAndInstall((event) => {
      switch (event.event) {
        case "Started":
          setContentLength(event.data.contentLength || 0);
          if (event.data.contentLength) {
            setContentLengthMB(
              Number((event.data.contentLength / (1024 * 1024)).toFixed(2))
            );
          }
          break;
        case "Progress":
          downloaded.current += event.data.chunkLength;
          setDownloadedMB(
            Number((downloaded.current / (1024 * 1024)).toFixed(2))
          );
          break;
        case "Finished":
          setIsDownloading(false);
          break;
      }
    });
  };

  return (
    <>
      <Wrap>
        <div>
          {logo && <CardImageStyled src={logo} />}
          <DateAndTime>
            <Title1>{currentTime}</Title1>
            <Text>{dayjs().format("dddd, M MMMM, YYYY")}</Text>
          </DateAndTime>
        </div>
        <Box appearance="subtle">
          <Caption1>Youcef</Caption1>
          <Caption1>0555 76 73 19</Caption1>
          <Caption1Strong>Codebox</Caption1Strong>
          <ImageStyled src={CodeBox} />
        </Box>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: tokens.spacingVerticalS,
          }}>
          <Caption1>v.{version}</Caption1>
          <Button
            appearance="subtle"
            icon={loading ? <LoadingIcon /> : <Box24Regular />}
            onClick={check}
            disabled={loading}>
            Mettre à jour
          </Button>
        </div>
      </Wrap>
      <UpdateDialog
        open={!!error || !!updateData?.version}
        setOpen={setDialogOpen}
        error={error}
        cloudVersion={updateData?.version || ""}
        confirm={confirm}
        cancel={cancel}
        retry={retry}
        isDownloading={isDownloading}
        percentage={downloaded.current / contentLength || 0}
        downloadedMB={downloadedMB}
        contentLengthMB={contentLengthMB}
      />
    </>
  );
};

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirm: () => void;
  error: string;
  cloudVersion: string;
  cancel: () => void;
  retry: () => void;
  isDownloading: boolean;
  percentage: number;
  downloadedMB: number;
  contentLengthMB: number;
}

export const UpdateDialog = ({
  open,
  confirm,
  error,
  cloudVersion,
  cancel,
  retry,
  isDownloading,
  percentage,
  downloadedMB,
  contentLengthMB,
}: DialogProps) => {
  return (
    <Dialog open={open}>
      <DialogSurface
        mountNode={document.querySelector("#main")}
        style={{ transitionDuration: "var(--durationUltraFast)" }}>
        <DialogBody>
          <DialogTitle>
            {isDownloading
              ? "En cours de téléchargement"
              : cloudVersion
              ? "Mise à jour disponible"
              : "Erreur"}
          </DialogTitle>
          {isDownloading ? (
            <>
              <Field
                validationMessage={`${downloadedMB} MB / ${contentLengthMB} MB`}
                validationState="none">
                <ProgressBar value={percentage} />
              </Field>
            </>
          ) : (
            <DialogContent>
              {cloudVersion
                ? `La version ${cloudVersion} est disponible. Voulez-vous la télécharger et l'installer ?`
                : error === "no-internet"
                ? "Une erreur est survenue lors de la tentative de connexion au serveur. Veuillez vérifier votre connexion internet et réessayer."
                : error}
            </DialogContent>
          )}
          {!isDownloading && (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" onClick={cancel}>
                  Annuler
                </Button>
              </DialogTrigger>
              {error ? (
                <Button appearance="primary" onClick={retry}>
                  Réessayer
                </Button>
              ) : (
                <Button appearance="primary" onClick={confirm}>
                  Télécharger et installer
                </Button>
              )}
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const Progress = (props: Partial<ProgressBarProps>) => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} />
    </Field>
  );
};
