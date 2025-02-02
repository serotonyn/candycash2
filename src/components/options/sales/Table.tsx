import dayjs from 'dayjs';
import { useState } from 'react';

import { TransactionExpanded } from '@/types/expanded';
import styled from '@emotion/styled';
import {
    Caption1, createTableColumn, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Subtitle2,
    Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow,
    TableSelectionCell, useTableColumnSizing_unstable, useTableFeatures, useTableSelection
} from '@fluentui/react-components';

import { useSalesStore } from './store';

import type {
  OnSelectionChangeData,
  TableColumnDefinition,
  TableColumnSizingOptions,
} from "@fluentui/react-components";
const TableRowStyled = styled(TableRow)`
  width: fit-content;
  min-width: 100%;
`;

const TableWrapper = styled.div`
  // width: calc(100vw - 327px - 24px);
  overflow: auto;
  flex: 1;
`;

const InnerBody = styled.div`
  // height: calc(100vh - 560px);
  overflow-y: auto;
`;

const columns: TableColumnDefinition<Partial<TransactionExpanded>>[] = [
  createTableColumn<Partial<TransactionExpanded>>({
    columnId: "sequence",
    renderHeaderCell: () => <>Id</>,
  }),
  createTableColumn<Partial<TransactionExpanded>>({
    columnId: "created",
    renderHeaderCell: () => <>Crée le</>,
  }),
  createTableColumn<Partial<TransactionExpanded>>({
    columnId: "user",
    renderHeaderCell: () => <>Utilisateur</>,
  }),
  createTableColumn<Partial<TransactionExpanded>>({
    columnId: "grandTotal",
    renderHeaderCell: () => <>Total</>,
  }),
];

export const SalesTable = ({
  transactions,
  total,
}: {
  transactions: TransactionExpanded[];
  total?: string;
}) => {
  const selectedSaleId = useSalesStore((state) => state.selectedSaleId);
  const setSelectedSaleId = useSalesStore((state) => state.setSelectedSaleId);

  const [columnSizingOptions] = useState<TableColumnSizingOptions>({
    sequence: {
      idealWidth: 20,
      defaultWidth: 20,
    },
    created: {
      idealWidth: 50,
    },
    user: {
      idealWidth: 40,
    },
    grandTotal: {
      idealWidth: 40,
    },
  });

  const onSelectionChange: (
    event: React.SyntheticEvent<Element, Event>,
    data: OnSelectionChangeData
  ) => void = (_, { selectedItems }) => {
    const index = [...selectedItems.values()][0] as number;
    if (index === undefined) return;
    setSelectedSaleId(transactions[index].id);
  };
  const {
    getRows,
    selection: { toggleRow, isRowSelected },
    columnSizing_unstable,
  } = useTableFeatures(
    {
      columns,
      items: transactions,
    },
    [
      useTableSelection({
        selectionMode: "single",
        onSelectionChange,
        selectedItems: new Set([
          transactions.findIndex((i) => i.id === selectedSaleId),
        ]),
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
    <TableWrapper>
      <Table noNativeElements aria-rowcount={rows.length} size="small">
        <TableHeader>
          <TableRowStyled>
            <TableSelectionCell type="radio" hidden />
            {columns.map((column) => (
              <Menu openOnContext key={column.columnId}>
                <MenuTrigger>
                  <TableHeaderCell key={column.columnId}>
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

        <TableBody>
          <InnerBody>
            {rows.map(({ item, selected, onKeyDown, onClick }) => (
              <TableRowStyled
                key={item.id}
                onClick={onClick}
                onKeyDown={onKeyDown}
                aria-selected={selected}>
                <TableSelectionCell
                  checked={selected}
                  type="radio"
                  radioIndicator={{ "aria-label": "Select row" }}
                />

                <TableCell>
                  <Subtitle2>{item.sequence}</Subtitle2>
                </TableCell>
                <TableCell>
                  <Subtitle2>
                    {dayjs(item.created).format("DD/MM/YYYY HH:mm:ss")}
                  </Subtitle2>
                </TableCell>
                <TableCell>
                  <TableCellLayout>
                    <Subtitle2>{item.expand?.user?.name}</Subtitle2>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <Subtitle2>
                    {item.grandTotal} <Caption1>DA</Caption1>
                  </Subtitle2>
                </TableCell>
              </TableRowStyled>
            ))}
            {rows.length !== 0 && (
              <TableRowStyled key="total">
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Subtitle2 style={{ fontWeight: "bold" }}>{total}</Subtitle2>
                </TableCell>
              </TableRowStyled>
            )}
          </InnerBody>
        </TableBody>
      </Table>
    </TableWrapper>
  );
};
