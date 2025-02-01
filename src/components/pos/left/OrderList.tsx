/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';

import { useDeleteOrderItem } from '@/components/hooks/useDeleteOrderItem';
import { OrderItemsResponse } from '@/pocketbase-types';
import { OrderItemExpanded } from '@/types/expanded';
import styled from '@emotion/styled';
import {
  Button, Caption1, createTableColumn, Image, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger,
  OnSelectionChangeData, Subtitle2, Table, TableBody, TableCell, TableCellLayout,
  TableColumnDefinition, TableColumnSizingOptions, TableHeader, TableHeaderCell, TableRow,
  TableRowData, TableSelectionCell, tokens, useTableColumnSizing_unstable, useTableFeatures,
  useTableSelection
} from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

import { usePosStore } from '../store';

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
  createTableColumn<Partial<OrderItemsResponse>>({
    columnId: "actions",
    renderHeaderCell: () => <></>,
  }),
];

export const OrderList = () => {
  const selectedIndex = usePosStore((state) => state.selectedIndex);
  const setSelectedIndex = usePosStore((state) => state.setSelectedIndex);
  const orderItems = usePosStore((state) => state.orderItems);
  const leftShows = usePosStore((state) => state.leftShows);
  const setSelectedItem = usePosStore((state) => state.setSelectedItem);
  const setQuantity = usePosStore((state) => state.setQuantity);

  const isHistory = leftShows === "HISTORY";

  const { deleteOrderItemWhenHistory } = useDeleteOrderItem()

  const [columnSizingOptions] = useState<TableColumnSizingOptions>({
    index: {
      idealWidth: 40,
    },
    product: {
      minWidth: 310,
      defaultWidth: 160,
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
    actions: {
      idealWidth: isHistory ? 30 : 0,
    },
  });

  const onSelectionChange: (
    event: React.SyntheticEvent<Element, Event>,
    data: OnSelectionChangeData
  ) => void = (_, { selectedItems }) => {
    const index = [...selectedItems.values()][0] as number;
    if (index === undefined) return;
    setSelectedIndex(orderItems[index].itemIndex);

    const orderItem = orderItems[index];
    setQuantity(String(orderItem.quantity));
  };

  const {
    getRows,
    selection: { toggleRow, isRowSelected },
    columnSizing_unstable,
  } = useTableFeatures(
    {
      columns,
      items: orderItems,
    },
    [
      useTableSelection({
        selectionMode: "single",
        onSelectionChange,
        selectedItems: new Set([
          orderItems.findIndex((i) => i.itemIndex === selectedIndex),
        ]),
      }),
      useTableColumnSizing_unstable({ columnSizingOptions }),
    ]
  );

  const onSelect = (
    e: React.MouseEvent,
    row: TableRowData<Partial<OrderItemExpanded>>
  ) => {
    if (leftShows !== "CURRENT_TRANSACTION") return;
    toggleRow(e, row.rowId);
    setSelectedItem(row.item.expand?.product);
  };

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Partial<OrderItemExpanded>) => {
    e.stopPropagation();
    if (!item?.id) return;
    deleteOrderItemWhenHistory(item as OrderItemExpanded)
  }

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => onSelect(e, row),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (leftShows !== "CURRENT_TRANSACTION") return;
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
          {leftShows === "CURRENT_TRANSACTION" && (
            <TableSelectionCell type="radio" hidden />
          )}
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
            {leftShows === "CURRENT_TRANSACTION" && (
              <TableSelectionCell
                checked={selected}
                type="radio"
                radioIndicator={{ "aria-label": "Select row" }}
              />
            )}
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
            {isHistory && <TableCell role="gridcell" tabIndex={0}>
              <TableCellLayout>
                <Button icon={<DeleteRegular />} aria-label="Delete" onClick={(e) => onDeleteItem(e, item)} />
              </TableCellLayout>
            </TableCell>}
          </TableRowStyled>
        ))}
      </TableBodyStyled>
    </TableStyled>
  );
};
