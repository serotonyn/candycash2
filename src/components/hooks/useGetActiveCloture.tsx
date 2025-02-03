import { useEffect } from "react";

import { CloturesResponse, Collections } from "@/pocketbase-types";
import client from "@/services/client";

import { usePosStore } from "../pos/store";
import { manageError } from "@/services/manage-error";
import { ClientResponseError } from "pocketbase";

interface OwnProps {
  requestKey: string;
}

export const useGetActiveCloture = ({ requestKey }: OwnProps) => {
  const setActiveCloture = usePosStore((store) => store.setActiveCloture);

  const fetchActiveCloture = async () => {
    try {
      const cloture = await client
        ?.collection(Collections.Clotures)
        .getFirstListItem<CloturesResponse>("active=true", {
          requestKey,
        });

      setActiveCloture(cloture);
    } catch (err) {
      setActiveCloture(undefined);
      throw err;
      manageError(err as ClientResponseError);
      return {};
    } finally {
    }
  };

  useEffect(() => {
    fetchActiveCloture();
  }, []);

  return {
    refetch: fetchActiveCloture,
  };
};
