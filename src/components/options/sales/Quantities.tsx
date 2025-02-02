import { useState } from "react";

import { Quantity } from "@/components/hooks/useGetQuantities";
import styled from "@emotion/styled";
import {
  createTableColumn,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSelection,
} from "@fluentui/react-components";

import type {
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

const columns: TableColumnDefinition<Partial<Quantity>>[] = [
  createTableColumn<Partial<Quantity>>({
    columnId: "code",
    renderHeaderCell: () => <>Code</>,
  }),
  createTableColumn<Partial<Quantity>>({
    columnId: "product",
    renderHeaderCell: () => <>Produit</>,
  }),
  createTableColumn<Partial<Quantity>>({
    columnId: "quantity",
    renderHeaderCell: () => <>Qte</>,
  }),
];

export const QuantitesTable = ({ quantities }: { quantities: Quantity[] }) => {
  const [columnSizingOptions] = useState<TableColumnSizingOptions>({
    code: {
      idealWidth: 50,
    },
    product: {
      idealWidth: 40,
    },
    quantity: {
      idealWidth: 40,
    },
  });

  const {
    getRows,
    selection: { toggleRow, isRowSelected },
    columnSizing_unstable,
  } = useTableFeatures(
    {
      columns,
      items: quantities,
    },
    [
      useTableSelection({
        selectionMode: "single",
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
            {rows
              .sort((a, b) => (a.item.quantity > b.item.quantity ? -1 : 1))
              .map(({ item, selected, onKeyDown, onClick }) => (
                <TableRowStyled
                  key={item.code}
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  aria-selected={selected}>
                  <TableSelectionCell
                    checked={selected}
                    type="radio"
                    radioIndicator={{ "aria-label": "Select row" }}
                  />

                  <TableCell>
                    <Subtitle2>{item.code}</Subtitle2>
                  </TableCell>
                  <TableCell>
                    <TableCellLayout>
                      <Subtitle2>{item.productName}</Subtitle2>
                    </TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <Subtitle2>{item.quantity}</Subtitle2>
                  </TableCell>
                </TableRowStyled>
              ))}
          </InnerBody>
        </TableBody>
      </Table>
    </TableWrapper>
  );
};
