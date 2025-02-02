import { TransactionsStatusOptions } from "@/pocketbase-types";
import { Subtitle2, TableCellLayout } from "@fluentui/react-components";
import {
  Checkmark12Filled,
  Dismiss12Filled,
  Important12Filled,
} from "@fluentui/react-icons";

export const Status = ({ status }: { status: TransactionsStatusOptions }) => {
  const renderText = () => {
    switch (status) {
      case TransactionsStatusOptions.NOT_PAID:
        return "Non payée";
      case TransactionsStatusOptions.PAID:
        return "Payée";
      case TransactionsStatusOptions.PARTIALLY_PAID:
        return "P. partiel";
      default:
        return "Surpayé";
    }
  };
  return (
    <TableCellLayout media={<StatusIcon status={status} />}>
      <Subtitle2>{renderText()}</Subtitle2>
    </TableCellLayout>
  );
};

const StatusIcon = ({ status }: { status: TransactionsStatusOptions }) => {
  switch (status) {
    case TransactionsStatusOptions.PAID:
      return <Checkmark12Filled color="green" />;
    case TransactionsStatusOptions.NOT_PAID:
      return <Dismiss12Filled color="red" />;
    case TransactionsStatusOptions.PARTIALLY_PAID:
      return <Important12Filled color="yellow" />;
    default:
      return <Important12Filled color="blue" />;
  }
};
