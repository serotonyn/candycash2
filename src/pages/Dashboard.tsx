import { Confettis } from "@/components/common/Confettis";
import { useInitTransaction } from "@/components/hooks/useInitTransaction";
import { AskStartShiftDialog } from "@/components/pos/AskStartShiftDialog";
import { Left } from "@/components/pos/Left";
import Right from "@/components/pos/Right";
import styled from "@emotion/styled";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 600px;

  & > div {
    height: 100%;
  }
  & > div:nth-of-type(1) {
    flex: 2;
  }
  & > div:nth-of-type(2) {
    flex: 3;
  }
`;

export const Dashboard = () => {
  const { init } = useInitTransaction();
  init();
  return (
    <Wrap>
      <Left />
      <Right />
      <AskStartShiftDialog />
      <Confettis />
    </Wrap>
  );
};
