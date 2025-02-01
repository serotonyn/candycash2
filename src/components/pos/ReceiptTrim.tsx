import dayjs from "dayjs";

import SegoeUiSemibold from "@/assets/segoe-ui-semibold.ttf";
import SegBlack from "@/assets/seguibl.ttf";
import F from "@/assets/SegUIVar.ttf";
import { OrderItemsResponse } from "@/pocketbase-types";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Segoe UI regular",
  src: F,
  fontWeight: "bold",
});
Font.register({
  family: "Segoe UI black",
  src: SegBlack,
});
Font.register({
  family: "Segoe UI semi-bold",
  src: SegoeUiSemibold,
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Segoe UI regular",
    backgroundColor: "#fff",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 6,
    marginBottom: 6,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginBottom: 4,
    fontSize: 10.5,
    lineHeight: 1,
  },
  label: {
    lineHeight: 1,
    fontSize: 8,
  },
  table: {},
  qteColumn: { flex: 1 },
  productColumn: { flex: 3 },
  priceColumn: { flex: 1, textAlign: "right" },
  totalColumn: { flex: 1, textAlign: "right" },
  qteColumnValue: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  productColumnValue: {
    flex: 3,
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  priceColumnValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  totalColumnValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  columnHeader: {
    fontSize: 10,
  },
  tableBody: {
    marginTop: 4,
  },
  tablRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

interface OwnProps {
  orderItems: Partial<OrderItemsResponse>[];
  sequence: number | undefined;
  dateCreated?: string;
}

export const ReceiptTrim = (props: OwnProps) => (
  <Document>
    <Page size={[204, 817.18]} style={styles.page} wrap={false}>
      <View
        style={{
          width: "98%",
        }}>
        <View style={styles.row}>
          <Text style={styles.label}>Date : </Text>
          <Text>{`${dayjs(props.dateCreated).format("DD-MM-YYYY")} À ${dayjs(
            props.dateCreated
          ).format("HH:mm:ss")}`}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ticket N° : </Text>
          <Text>{props.sequence}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.qteColumn}>
              <Text style={styles.columnHeader}>QTE</Text>
            </View>
            <View style={styles.productColumn}>
              <Text style={styles.columnHeader}>Product</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.columnHeader}>Prix</Text>
            </View>
            <View style={styles.totalColumn}>
              <Text style={styles.columnHeader}>Tot.</Text>
            </View>
          </View>
          <View style={styles.tableBody}>
            {props.orderItems.map((orderItem) => (
              <View key={orderItem.id} style={styles.tableHeader}>
                <View style={styles.qteColumnValue}>
                  <Text>{orderItem.quantity}</Text>
                </View>
                <View style={styles.productColumnValue}>
                  <Text>{orderItem.productName}</Text>
                </View>
                <View style={styles.priceColumnValue}>
                  <Text>{orderItem.salePrice}</Text>
                </View>
                <View style={styles.totalColumnValue}>
                  <Text>{orderItem.subtotal}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
