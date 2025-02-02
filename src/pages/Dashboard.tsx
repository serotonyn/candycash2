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
    flex: 1;
    height: 100%;
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
