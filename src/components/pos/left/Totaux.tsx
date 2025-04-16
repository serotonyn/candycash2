import TimeMachine from "@/assets/icons/time_machine.svg";
import styled from "@emotion/styled";
import {
  Button,
  Caption1,
  Display,
  Image,
  tokens,
} from "@fluentui/react-components";

import { Persona } from "../../common/Persona";
import { usePosStore } from "../store";

const Wrap = styled.div`
  padding: ${tokens.spacingHorizontalL};
  border-top: 1px solid ${tokens.colorNeutralBackground1Pressed};
  display: flex;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colorNeutralBackground1Pressed};
  padding-right: ${tokens.spacingHorizontalL};
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
`;

const ButtonStyled = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalL};
  padding: ${tokens.spacingHorizontalL};
  & > span:first-of-type {
    margin-right: 0;
  }
`;

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacingHorizontalS};
  align-items: normal;
  height: fit-content;
  padding: ${tokens.spacingVerticalL};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colorNeutralBackground3};
  & > button {
    flex: 1;
  }
`;

const Totaux = () => {
  const getGrandTotal = usePosStore((state) => state.computed.getGrandTotal);
  // needed for getGrandTotal
  usePosStore((state) => state.orderItems);
  const setLeftShows = usePosStore((state) => state.setLeftShows);

  const leftShows = usePosStore((state) => state.leftShows);

  return (
    <Wrap>
      <Left>
        <Persona totauxPage />
      </Left>
      {leftShows !== "IDLE" ? (
        <>
          <Center>
            <div>
              <Display>{getGrandTotal()}</Display>
              <Caption1> DA</Caption1>
            </div>
          </Center>
        </>
      ) : (
        <ButtonsWrap onClick={() => setLeftShows("HISTORY")}>
          <ButtonStyled icon={<Image src={TimeMachine} width={28} />}>
            Historique
          </ButtonStyled>
        </ButtonsWrap>
      )}
    </Wrap>
  );
};

export default Totaux;
