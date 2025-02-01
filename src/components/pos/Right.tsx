import styled from "@emotion/styled";

import { Bottom } from "./right/Bottom";
import { ProductPicker } from "./right/ProductPicker";
import { usePosStore } from "./store";

const Wrap = styled.div<{ flexEnd: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: ${({ flexEnd }) => (flexEnd ? "end" : "space-between")};
`;

const Right = () => {
  const leftShows = usePosStore((state) => state.leftShows);

  return (
    <Wrap id="right-wrap" flexEnd={leftShows === "HISTORY"}>
      {leftShows !== "HISTORY" && <ProductPicker />}
      <Bottom />
    </Wrap>
  );
};

export default Right;
