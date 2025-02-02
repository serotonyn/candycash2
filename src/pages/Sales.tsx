import dayjs from "dayjs";
import React, { useState } from "react";
import { Outlet, useMatch, useParams } from "react-router-dom";

import { MotionList } from "@/components/common/MotionList";
import PageHeader from "@/components/common/PageHeader";
import {
  Quantity,
  useGetQuantities,
} from "@/components/hooks/useGetQuantities";
import { useGetTransactions } from "@/components/hooks/useGetTransactions";
import { Filtering } from "@/components/options/sales/Filtering";
import { QuantitesTable } from "@/components/options/sales/Quantities";
import { SalesTable } from "@/components/options/sales/Table";
import { TableToolbar } from "@/components/options/sales/Toolbar";
import { CloturesResponse, Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { TransactionExpanded } from "@/types/expanded";
import styled from "@emotion/styled";
import {
  makeStyles,
  shorthands,
  Skeleton,
  SkeletonItem,
  SkeletonProps,
  Tab,
  TabList,
  tokens,
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXXL};
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

// TODO: extract to utils
const getKey = (cloture: CloturesResponse) => {
  return `${dayjs(cloture?.created).format(
    "dddd DD MMMM YYYY [De] HH:mm [À]"
  )} ${
    dayjs(cloture?.created).isSame(cloture?.updated)
      ? "Maintenant"
      : dayjs(cloture?.updated).format("HH:mm")
  }`;
};

const Sales = () => {
  const isInSale = !!useMatch("/options/sales/:saleId");
  const { saleId } = useParams();
  const [groupedTransactions, setGroupedTransactions] = useState<
    Record<string, TransactionExpanded[]>
  >({});
  const [groupedQuantities, setGroupedQuantities] = useState<
    Record<string, Quantity[]>
  >({});

  const [transactionsOrQuantities, setTransactionsOrQuantities] = useState<
    "transactions" | "quantities"
  >("transactions");

  const [filterCreated, setFilterCreated] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const { transactions, refetch, count, total, loading, startDate, endDate } =
    useGetTransactions({
      expand: "user,cloture",
      filter: `created ~ "${filterCreated}"`,
      requestKey: "sales",
    });

  const { quantities } = useGetQuantities({
    requestKey: "sales-quantities",
    filter: `created ~ "${filterCreated}"`,
    block: transactionsOrQuantities === "transactions",
    deps: [transactionsOrQuantities, filterCreated],
  });

  const headerList = [
    {
      title: "Ventes",
      to: "/options/sales",
      current: false,
    },
  ];

  if (saleId) {
    const sequence = transactions.find(
      (transaction) => transaction.id === saleId
    )?.sequence;
    headerList.push({
      title: String(sequence || ""),
      to: `/options/sales/${sequence}`,
      current: true,
    });
  }

  const remove = async (transactionId: string) => {
    if (!transactionId) return;
    await client?.collection(Collections.Transactions).delete(transactionId);
    refetch();
  };

  React.useEffect(() => {
    if (transactionsOrQuantities !== "transactions") return;
    const groupedTransactions = transactions.reduce((acc, cur) => {
      const cloture = cur.expand?.cloture;
      const key = cloture?.id ? getKey(cloture) : "Pas de shift";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(cur);
      return acc;
    }, {} as Record<string, TransactionExpanded[]>);
    setGroupedTransactions(groupedTransactions);
  }, [transactions, transactionsOrQuantities]);

  React.useEffect(() => {
    if (transactionsOrQuantities !== "quantities") return;
    const groupedQuantities = quantities.reduce((acc, cur) => {
      const cloture = cur.cloture;
      const key = cloture?.id ? getKey(cloture) : "Pas de shift";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(cur);
      return acc;
    }, {} as Record<string, Quantity[]>);
    setGroupedQuantities(groupedQuantities);
  }, [transactionsOrQuantities, quantities]);

  React.useEffect(() => {
    if (transactionsOrQuantities === "quantities") {
      setGroupedTransactions({});
    } else {
      setGroupedQuantities({});
    }
  }, [transactionsOrQuantities]);

  return (
    <Wrap>
      <PageHeader list={headerList} />

      <MotionList>
        {!isInSale ? (
          <Container>
            {loading ? (
              <div>
                <Skeleton>
                  <SkeletonItem />
                </Skeleton>
                <Row />
              </div>
            ) : (
              <div>
                <TableToolbar
                  remove={remove}
                  totalSalesCount={count}
                  totalSales={total}
                  startDate={startDate}
                  endDate={endDate}
                  grouped={groupedTransactions}
                />
                <TabList
                  selectedValue={transactionsOrQuantities}
                  onTabSelect={(_, { value }) =>
                    setTransactionsOrQuantities(
                      value as "transactions" | "quantities"
                    )
                  }>
                  <Tab value="transactions">Transactions</Tab>
                  <Tab value="quantities">Quantités</Tab>
                </TabList>

                {Object.keys(groupedTransactions).length ? (
                  <GroupedTransactions grouped={groupedTransactions} />
                ) : null}

                {Object.keys(groupedQuantities).length ? (
                  <GroupedQuantities grouped={groupedQuantities} />
                ) : null}
              </div>
            )}
            <Filtering setFilterCreated={setFilterCreated} />
          </Container>
        ) : (
          <Outlet />
        )}
      </MotionList>
    </Wrap>
  );
};

const useStyles = makeStyles({
  invertedWrapper: {
    marginTop: "2rem",
    paddingTop: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  firstRow: {
    alignItems: "center",
    display: "grid",
    paddingBottom: "10px",
    position: "relative",
    ...shorthands.gap("10px"),
    gridTemplateColumns: "min-content 80%",
  },
  secondThirdRow: {
    alignItems: "center",
    display: "grid",
    paddingBottom: "10px",
    position: "relative",
    ...shorthands.gap("10px"),
    gridTemplateColumns: "min-content 20% 20% 15% 15%",
  },
});

const Row = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props}>
        <div className={styles.firstRow}>
          <SkeletonItem shape="circle" size={24} />
          <SkeletonItem shape="rectangle" size={16} />
        </div>
        <div className={styles.secondThirdRow}>
          <SkeletonItem shape="circle" size={24} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
        </div>
        <div className={styles.secondThirdRow}>
          <SkeletonItem shape="square" size={24} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
          <SkeletonItem size={16} />
        </div>
      </Skeleton>
    </div>
  );
};

const GroupedTransactions = ({
  grouped,
}: {
  grouped: Record<string, TransactionExpanded[]>;
}) => {
  const keys = Object.keys(grouped);
  const getTotal = (transactions: TransactionExpanded[]) => {
    if (transactions?.length) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "DZD",
      }).format(transactions.reduce((acc, cur) => acc + cur.grandTotal, 0));
    }
    return "";
  };
  return (
    <Tree
      aria-label="Default Open"
      defaultOpenItems={keys}
      style={{
        height: "calc(100vh - 560px)",
        overflow: "auto",
      }}>
      {grouped &&
        Object.keys(grouped).map((key) => (
          <TreeItem key={key} itemType="branch" value={key}>
            <TreeItemLayout>
              {key} | Total: {getTotal(grouped[key])}
            </TreeItemLayout>
            <Tree>
              <SalesTable
                key={key}
                transactions={grouped[key]}
                total={getTotal(grouped[key])}
              />
            </Tree>
          </TreeItem>
        ))}
    </Tree>
  );
};

const GroupedQuantities = ({
  grouped,
}: {
  grouped: Record<string, Quantity[]>;
}) => {
  const keys = Object.keys(grouped);
  return (
    <Tree
      aria-label="Default Open"
      defaultOpenItems={keys}
      style={{
        height: "calc(100vh - 560px)",
        overflow: "auto",
      }}>
      {grouped &&
        Object.keys(grouped).map((key) => (
          <TreeItem key={key} itemType="branch" value={key}>
            <TreeItemLayout>{key}</TreeItemLayout>
            <Tree>
              <QuantitesTable key={key} quantities={grouped[key]} />
            </Tree>
          </TreeItem>
        ))}
    </Tree>
  );
};

export default Sales;
