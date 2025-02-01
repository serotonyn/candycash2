import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useGetCompany } from "@/components/hooks/useGetCompany";
import styled from "@emotion/styled";
import { Image, Text, Title1, tokens } from "@fluentui/react-components";

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${tokens.spacingHorizontalL};
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
      {logo && <CardImageStyled src={logo} />}
      <DateAndTime>
        <Title1>{currentTime}</Title1>
        <Text>{dayjs().format("dddd, M MMMM, YYYY")}</Text>
      </DateAndTime>
    </Wrap>
  );
};
