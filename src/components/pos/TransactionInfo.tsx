import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LowPrice from "@/assets/icons/low_price.svg";
import { TransactionsResponse } from "@/pocketbase-types";
import styled from "@emotion/styled";
import {
  Badge,
  Button,
  Caption1,
  Caption1Strong,
  Image,
  Title3,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowLeft16Filled,
  ArrowRight16Filled,
  Delete16Filled,
  Dismiss16Filled,
} from "@fluentui/react-icons";

import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import { useLazyGetTransaction } from "../hooks/useLazyGetTransaction";
import { getRelativeTime } from "./helpers";
import { usePosStore } from "./store";

const XContainer = styled.div`
  max-height: 122px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: ${tokens.spacingHorizontalL};
  padding: ${tokens.spacingHorizontalL};
  height: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.colorNeutralBackground1Pressed};
`;

const YContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ZContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacingHorizontalS};
`;

const AContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const BContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.spacingHorizontalS};
`;

export const TransactionInfo = () => {
  const navigate = useNavigate();

  const setOrderItems = usePosStore((state) => state.setOrderItems);
  const setTransaction = usePosStore((state) => state.setTransaction);
  const setLeftShows = usePosStore((state) => state.setLeftShows);

  const [fetchedTransaction, setFetchedTransaction] = useState<
    Partial<TransactionsResponse> | undefined
  >(undefined);
  const [noMorePrevious, setNoMorePrevious] = useState(false);
  const [noMoreNext, setNoMoreNext] = useState(true);

  const { getTransaction } = useLazyGetTransaction();
  const { remove } = useDeleteTransaction();

  useEffect(() => {
    getTransaction()
      .then((fetched) => {
        if (!fetched) return;
        setFetchedTransaction(fetched);
        setTransaction(fetched);
        setOrderItems(fetched?.expand["orderItems(transaction)"] || []);
      })
      .catch(() => {
        throw "no transaction fetched";
      });
  }, []);

  const onChange = async (payload: "PREVIOUS" | "NEXT") => {
    if (payload === "PREVIOUS") {
      setNoMoreNext(false);
    } else {
      setNoMorePrevious(false);
    }

    if (!fetchedTransaction) return;

    try {
      let filter, sort;
      if (payload === "PREVIOUS") {
        filter = `created < "${fetchedTransaction.created}"`;
        sort = "-created";
      } else {
        filter = `created > "${fetchedTransaction.created}"`;
        sort = "created";
      }
      const transactionFetched = await getTransaction(filter, sort);

      if (transactionFetched) {
        setFetchedTransaction(transactionFetched);
        setTransaction(transactionFetched);
        setOrderItems(
          transactionFetched.expand["orderItems(transaction)"]?.sort((a, b) =>
            a.itemIndex > b.itemIndex ? 1 : -1
          ) || []
        );
      } else {
        if (payload === "PREVIOUS") {
          setNoMorePrevious(true);
        } else {
          setNoMoreNext(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    setFetchedTransaction(undefined);
    setTransaction(undefined);
    setOrderItems([]);
    setLeftShows("IDLE");
  };

  const goSales = () => {
    navigate("/options/sales");
  };

  const deleteTransaction = () => {
    if (!fetchedTransaction?.id) return;
    remove(fetchedTransaction.id);
    onChange("PREVIOUS");
  };

  return fetchedTransaction ? (
    <XContainer>
      <AContainer>
        <Button
          icon={<ArrowLeft16Filled />}
          iconPosition="before"
          size="large"
          onClick={() => onChange("PREVIOUS")}
          disabled={noMorePrevious}></Button>
        <YContainer>
          <ZContainer>
            <Caption1>Ticket #: </Caption1>
            <Title3>{fetchedTransaction?.sequence}</Title3>
            {!fetchedTransaction && (
              <Badge appearance="tint" size="small">
                En cours
              </Badge>
            )}
          </ZContainer>
          <Caption1Strong>
            {getRelativeTime(dayjs(fetchedTransaction?.created))}
          </Caption1Strong>
        </YContainer>
        <Button
          icon={<ArrowRight16Filled />}
          iconPosition="after"
          size="large"
          onClick={() => onChange("NEXT")}
          disabled={noMoreNext}></Button>
      </AContainer>
      <BContainer>
        <Button icon={<Dismiss16Filled />} size="large" onClick={onClose}>
          Fermer
        </Button>
        <Button
          icon={<Image src={LowPrice} width={20} />}
          size="large"
          onClick={goSales}>
          Voir Ventes
        </Button>
        <Button
          icon={<Delete16Filled />}
          size="large"
          onClick={deleteTransaction}>
          Supprimer
        </Button>
      </BContainer>
    </XContainer>
  ) : (
    <XContainer />
  );
};
