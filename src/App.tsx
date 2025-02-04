import styled from "@emotion/styled";
import { Routes } from "./components/Routes";

const PageWrapper = styled.div`
  & div.fui-DialogSurface__backdrop {
    inset: 27px 0px 0px 0px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

function App() {
  return (
    <PageWrapper id="main">
      <Routes />
    </PageWrapper>
  );
}

export default App;
