import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
} from "@fluentui/react-components";
import { Box24Regular } from "@fluentui/react-icons";

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${tokens.spacingHorizontalL};
  & > div:nth-child(2) {
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

export const Idle = () => {
  const [logo, setLogo] = useState(null);
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format("HH:mm:ss")
  );
  const { fetch: fetchCompany } = useGetCompany({ requestKey: "idle" });

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

  return (
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

      <Button appearance="subtle" icon={<Box24Regular />}>
        Mettre à jour
      </Button>
    </Wrap>
  );
};
