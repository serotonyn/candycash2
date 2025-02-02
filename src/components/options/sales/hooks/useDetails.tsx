import { useNavigate } from "react-router-dom";

import { useSalesStore } from "../store";

export const useDetails = () => {
  const selectedSaleId = useSalesStore((state) => state.selectedSaleId);
  const navigate = useNavigate();

  const details = () => {
    if (selectedSaleId === undefined) return null;
    navigate(`/options/sales/${selectedSaleId}`);
  };
  return { details };
};
