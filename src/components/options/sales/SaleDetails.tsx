import { useState } from "react";

import { useGetTransaction } from "@/components/hooks/useGetTransactions";
import { OrderItemsResponse } from "@/pocketbase-types";
import styled from "@emotion/styled";
import {
  Caption1,
  createTableColumn,
  Image,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  OnSelectionChangeData,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  tokens,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSelection,
} from "@fluentui/react-components";

import { useSalesStore } from "./store";

const TableStyled = styled(Table)`
  height: 100%;
  min-width: 50vw !important;
  overflow: auto;
  padding-top: ${tokens.spacingVerticalL};
`;

const TableBodyStyled = styled(TableBody)`
  height: calc(100vh - "256px"} - 128px - 33px - 64px);
  max-height: calc(100vh - "256px"} - 128px - 33px - 64px);
`;

const TableRowStyled = styled(TableRow)`
  width: fit-content;
  min-width: 100%;
`;

const columns: TableColumnDefinition<Partial<OrderItemsResponse>>[] = [
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "index",
    renderHeaderCell: () => <>Index</>,
  }),
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "product",
    renderHeaderCell: () => <>Article</>,
  }),
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "quantity",
    renderHeaderCell: () => <>Qte</>,
  }),
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "unitPrice",
    renderHeaderCell: () => <>P.U</>,
  }),
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "lineTotal",
    renderHeaderCell: () => <>Total</>,
  }),
];

export const SaleDetails = () => {
  // const setSelectedIndex = usePosStore((state) => state.setSelectedIndex);
  const selectedSaleId = useSalesStore((state) => state.selectedSaleId);

  const { transaction } = useGetTransaction({
    transactionId: selectedSaleId,
    expand: "orderItems(transaction), orderItems(transaction).product",
    requestKey: "sale-details",
  });

  const [columnSizingOptions] = useState<TableColumnSizingOptions>({
    index: {
      idealWidth: 40,
    },
    product: {
      minWidth: 300,
      defaultWidth: 250,
    },
    quantity: {
      idealWidth: 40,
    },
    subqty: {
      idealWidth: 40,
    },
    unitPrice: {
      idealWidth: 90,
    },
  });

  const onSelectionChange: (
    event: React.SyntheticEvent<Element, Event>,
    data: OnSelectionChangeData
  ) => void = (_, { selectedItems }) => {
    const index = [...selectedItems.values()][0] as number;
    if (index === undefined) return;
    // setSelectedIndex(orderItems[index].itemIndex);
  };

  const {
    getRows,
    selection: { toggleRow, isRowSelected },
    columnSizing_unstable,
  } = useTableFeatures(
    {
      columns,
      items: transaction?.expand["orderItems(transaction)"] || [],
    },
    [
      useTableSelection({
        selectionMode: "single",
        onSelectionChange,
        // selectedItems: new Set([
        //   orderItems.findIndex((i) => i.itemIndex === selectedIndex),
        // ]),
      }),
      useTableColumnSizing_unstable({ columnSizingOptions }),
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ("brand" as const) : ("none" as const),
    };
  });

  return (
    <TableStyled noNativeElements {...columnSizing_unstable.getTableProps()}>
      <TableHeader>
        <TableRowStyled>
          <TableSelectionCell type="radio" hidden />
          {columns.map((column) => (
            <Menu openOnContext key={column.columnId}>
              <MenuTrigger>
                <TableHeaderCell
                  key={column.columnId}
                  {...columnSizing_unstable.getTableHeaderCellProps(
                    column.columnId
                  )}>
                  {column.renderHeaderCell()}
                </TableHeaderCell>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem
                    onClick={columnSizing_unstable.enableKeyboardMode(
                      column.columnId
                    )}>
                    Keyboard Column Resizing
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          ))}
        </TableRowStyled>
      </TableHeader>

      <TableBodyStyled>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRowStyled
            key={item.itemIndex}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            style={{ backgroundColor: tokens.colorNeutralBackground1 }}
            appearance={appearance}>
            <TableSelectionCell
              checked={selected}
              type="radio"
              radioIndicator={{ "aria-label": "Select row" }}
            />
            <TableCell {...columnSizing_unstable.getTableCellProps("index")}>
              <Subtitle2>{item.itemIndex}</Subtitle2>
            </TableCell>
            <TableCell {...columnSizing_unstable.getTableCellProps("product")}>
              <TableCellLayout
                media={<Image src={item.expand?.product?.imgUrl} width={20} />}>
                <Subtitle2>{item.productName}</Subtitle2>
              </TableCellLayout>
            </TableCell>
            <TableCell {...columnSizing_unstable.getTableCellProps("quantity")}>
              <Subtitle2>{item.quantity}</Subtitle2>
            </TableCell>
            <TableCell
              {...columnSizing_unstable.getTableCellProps("unitPrice")}>
              <Subtitle2>
                {item.salePrice} <Caption1>DA</Caption1>
              </Subtitle2>
            </TableCell>
            <TableCell
              {...columnSizing_unstable.getTableCellProps("lineTotal")}>
              <Subtitle2>
                {item.subtotal} <Caption1>DA</Caption1>
              </Subtitle2>
            </TableCell>
          </TableRowStyled>
        ))}
      </TableBodyStyled>
    </TableStyled>
  );
};
