import { usePrintSales } from '@/components/hooks/usePrintSales';
import { TransactionExpanded } from '@/types/expanded';
import styled from '@emotion/styled';
import {
    Subtitle2, tokens, Toolbar, ToolbarButton, ToolbarDivider, Tooltip
} from '@fluentui/react-components';
import {
    ArrowExportLtr24Regular, Calculator24Regular, Delete24Regular, DocumentPdf24Regular,
    Print24Regular, Receipt24Regular, Table24Regular
} from '@fluentui/react-icons';

import { useDetails } from './hooks/useDetails';
import { useSalesStore } from './store';

import type { ToolbarProps } from "@fluentui/react-components";
const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${tokens.spacingVerticalL};
  width: 100%;
`;

const Totaux = styled.div`
  display: flex;
  gap: ${tokens.spacingVerticalL};
`;

export const TableToolbar = (
  props: Partial<ToolbarProps> & {
    remove: (transactionId: string) => void;
    totalSales: string | null;
    totalSalesCount: number | null;
    startDate: string | null;
    endDate: string | null;
    grouped: Record<string, TransactionExpanded[]>;
  }
) => {
  const selectedSaleId = useSalesStore((state) => state.selectedSaleId);
  const setSelectedSaleId = useSalesStore((state) => state.setSelectedSaleId);
  const { details } = useDetails();

  const remove = () => {
    if (!selectedSaleId) return;
    props.remove(selectedSaleId);
    setSelectedSaleId(undefined);
  };

  const { print: printSales } = usePrintSales();

  const print = async () => {
    const { startDate, endDate, totalSales, totalSalesCount, grouped } = props;
    if (!startDate || !endDate || !totalSales || !totalSalesCount || !grouped)
      return;
    printSales(startDate, endDate, totalSales, totalSalesCount, grouped);
  };

  return (
    <ToolbarWrapper>
      <Totaux>
        <div>
          <Subtitle2>Total: </Subtitle2>
          <Subtitle2>{props.totalSales || ""}</Subtitle2>
        </div>
        <div>
          <Subtitle2># Ventes: </Subtitle2>
          <Subtitle2>{props.totalSalesCount}</Subtitle2>
        </div>
      </Totaux>
      <Toolbar {...props} aria-label="Medium" size="medium">
        <ToolbarButton
          aria-label="Increase Font Size"
          appearance="primary"
          icon={<Table24Regular />}
          disabled={!selectedSaleId}
          onClick={details}>
          Détails
        </ToolbarButton>
        <ToolbarDivider />
        <Tooltip content="Supprimer" relationship="description" withArrow>
          <ToolbarButton
            icon={<Delete24Regular />}
            disabled={!selectedSaleId}
            onClick={remove}
          />
        </Tooltip>
        <Tooltip content="Caisse" relationship="description" withArrow>
          <ToolbarButton icon={<Calculator24Regular />} disabled />
        </Tooltip>
        <ToolbarDivider />
        <Tooltip content="Rapports" relationship="description" withArrow>
          <ToolbarButton icon={<Receipt24Regular />} disabled />
        </Tooltip>
        <ToolbarDivider />
        <Tooltip content="Imprimer" relationship="description" withArrow>
          <ToolbarButton
            icon={<Print24Regular />}
            onClick={print}
            disabled={!props.totalSalesCount}
          />
        </Tooltip>
        <Tooltip content="PDF" relationship="description" withArrow>
          <ToolbarButton icon={<DocumentPdf24Regular />} disabled />
        </Tooltip>
        <Tooltip content="Exporter excel" relationship="description" withArrow>
          <ToolbarButton icon={<ArrowExportLtr24Regular />} disabled />
        </Tooltip>
      </Toolbar>
    </ToolbarWrapper>
  );
};
