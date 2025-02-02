import dayjs from "dayjs";

import SegoeUiSemibold from "@/assets/segoe-ui-semibold.ttf";
import SegBlack from "@/assets/seguibl.ttf";
import F from "@/assets/SegUIVar.ttf";
import { OrderItemsResponse } from "@/pocketbase-types";
import {
  Document,
  Font,
  Page,
  Path,
  StyleSheet,
  Svg,
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
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  companyDetails: {
    flex: 2,
  },
  companyDetailsName: {
    fontFamily: "Segoe UI semi-bold",
  },
  companyDetailsAddress: {
    fontSize: 11,
  },
  logoWrap: {
    flex: 1,
  },
  logo: {
    width: 50,
    alignSelf: "flex-end",
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
  rowTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  totalValue: {
    fontFamily: "Segoe UI black",
  },
  merci: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    fontSize: 10,
  },
});

interface OwnProps {
  orderItems: Partial<OrderItemsResponse>[];
  // logoUrl?: string;
  total: number;
  sequence: number | undefined;
  // username?: string;
  dateCreated?: string;
}

export const MyDocument = (props: OwnProps) => (
  <Document>
    <Page size={[204, 817.18]} style={styles.page} wrap={false}>
      <View
        style={{
          width: "98%",
        }}>
        <View style={styles.header}>
          <Logo />
          <View style={styles.companyDetails}>
            <Text style={styles.companyDetailsName}>Jerry's</Text>
            <Text style={styles.companyDetailsAddress}>
              GARDEN CITY- CHERAGA
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Date : </Text>
          <Text>{`${dayjs(props.dateCreated).format("DD-MM-YYYY")} À ${dayjs(
            props.dateCreated
          ).format("HH:mm:ss")}`}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Agent : </Text>
          <Text>props.username</Text>
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

        <View style={styles.divider} />

        <View>
          <View style={styles.rowTotal}>
            <Text style={styles.label}>Total : </Text>
            <Text style={styles.totalValue}>{props.total} DA</Text>
          </View>
        </View>

        <View>
          <Text style={styles.merci}>Merci et à bientôt</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const Logo = () => {
  return (
    <Svg viewBox="0 0 235.82 108.66" width={40} height={20}>
      <Path
        d="M55.89,76.37c1.91-.97,4.03-1.52,6.05-2.25-.86-2.1-1.72-4.21-3.08-7.54,3.09-5.91,7.3-12.59,10.17-19.8,3.61-9.06,7.05-18.39,8.86-27.92C80.17,6.89,73.56-.2,61.58,0c-4.23.07-8.7.83-12.61,2.38-11.43,4.54-19.79,12.29-22.23,24.9-1.14,5.9.18,11.45,5.42,15.09,4.8,3.33,10.27,2.89,15.26.67,1.65-.73,2.28-3.75,3.38-5.72-1.97-.67-3.92-1.38-5.91-1.96-.4-.12-.93.31-1.42.4-5.08.98-7.93-1.18-7.25-6.39.45-3.46,1.47-7.66,3.81-9.87,4.36-4.11,9.48-7.95,14.97-10.21,9.29-3.82,14.74,1.22,12.59,11.13-3.42,15.8-10.13,30.22-19.2,43.59-1.99,2.94-4.52,3.73-7.92,4.13-8.23.98-16.51,2.13-24.54,4.11-6.81,1.68-12.45,5.68-15.04,12.72-2.83,7.68,1.34,16,8.71,17.19,6.37,1.03,13.03,1.09,18.28-3,7.41-5.78,14.1-12.46,21.24-18.59,1.99-1.71,4.41-2.99,6.77-4.19ZM9.96,87.42c1.33-2.55,3.31-5.17,5.69-6.68,6.74-4.29,14.37-5.09,23.34-4.88-6.36,9.46-13.48,16.05-23.64,18.52-4.57,1.11-7.56-2.81-5.39-6.96Z"
        fill="#000"
        stroke-width="0"
      />
      <Path
        d="M219.2,35.49c4.33-3.63,7.43-8.08,7.46-15.12-.09-.43.08-2.5-.82-3.2-1.77-1.39-4.26-2.93-6.22-2.67-1.48.2-4.03,3.61-3.63,4.72,1.69,4.75.79,8.59-1.9,12.59-.62.92-.06,3.54.85,4.28.79.64,3.27.23,4.26-.6Z"
        fill="#000"
        stroke-width="0"
      />
      <Path
        d="M232.46,31.7c-3.44-1.57-5.42.95-7.48,3.31-4.14,4.74-8.32,9.48-12.84,13.85-3.22,3.11-7.03,5.61-10.57,8.38-.59-1.88-.46-3.02-.04-4.03,1.96-4.77,4.25-9.42,5.86-14.31.55-1.68.09-4.94-1.04-5.62-1.54-.93-4.43-.67-6.23.17-1.79.85-3.09,2.94-4.34,4.68-3.19,4.47-6.07,9.17-9.39,13.53-1.92,2.52-4.45,4.56-6.71,6.81-.4-.28-.79-.56-1.19-.85.22-1.22.21-2.55.71-3.65,2.27-4.98,4.93-9.8,6.9-14.9.68-1.76.48-5.25-.61-5.96-1.44-.93-4.28-.27-6.27.42-1.19.41-2.05,2.11-2.79,3.38-2.27,3.88-4.27,7.92-6.65,11.72-2.62,4.18-6.19,7.37-11.43,8.71,2.83-5.88,6.65-10.99,9.92-16.42,1.08-1.79.75-4.43,1.07-6.68-2.42.16-5.01-.16-7.22.61-2.27.79-4.13,2.71-6.25,4.01-2.42,1.48-3.74.97-4.67-2.01-.53-1.68-2.7-4.11-3.97-4.02-2.09.16-4.57,1.68-5.9,3.39-1.18,1.52-1.17,4.06-1.43,6.18-.84,6.85-8.56,15.09-15.68,15.43,2.27-3.87,4.14-7.29,6.23-10.57,1.76-2.76,4.06-5.2,5.54-8.09.66-1.29.51-3.94-.4-4.84-.98-.96-3.35-1-4.96-.67-1.31.27-2.32,1.82-3.6,2.56-2.73,1.57-5.54,2.98-8.66,4.64-.5-1.85-.52-2.58-.87-3.08-1.22-1.77-2.51-4.84-3.84-4.87-2.01-.05-4.57,1.63-5.96,3.34-1.21,1.49-1.09,4.04-1.63,6.11-.54,2.05-.78,4.32-1.84,6.07-4.33,7.12-11.13,10.84-19.01,12.61-1.54.35-3.42-.81-5.14-1.28l.3-1.81c1.57-.31,3.16-.58,4.72-.93,6.23-1.36,11.65-3.94,15.01-9.76,4.45-7.7.9-14.16-7.95-14.41-8.77-.25-18.28,6.82-21.77,16.38-1.98,5.43-2.26,10.97,1.73,15.59,3.85,4.46,9.17,5.02,14.7,3.95,10.69-2.06,19.04-7.58,24.87-16.85,2.35-3.73,2.41-3.69,5.98-2.91-.75,1.5-1.63,2.91-2.21,4.44-1.57,4.14-2.91,8.42.74,12.14,3.6,3.68,7.9,2.82,12.1,1.17,7.1-2.78,12.15-7.9,16.34-14.12,1.38-2.05,3.46-3.64,5.22-5.44.38.33.77.66,1.15.99-1.49,5.66-6.9,11.66-1.41,17.05,6.34,6.23,12.6.32,18.5-2.21,6.02,6.77,9.5,6.38,20.92-2.4-1,9.6-3.63,12.11-12.21,12.12-1.5,0-3,.02-4.5-.04-32.37-1.28-64.6.47-96.6,5.36-8.49,1.3-16.84,3.94-25.01,6.69-6.17,2.07-10.84,6.49-13.17,12.8-.45,1.22-.44,3.47.31,4.08,1.02.82,3.03.91,4.47.61,1.92-.4,3.66-1.59,5.55-2.22,10.41-3.45,20.62-8.04,31.31-9.97,21.91-3.95,44.04-6.86,66.17-9.36,9.93-1.12,20.1-.19,30.32-.19-2.55,5-5.2,9.4-7.06,14.1-1.86,4.69-.09,10.19,3.47,11.99,4.27,2.15,8.12.69,11.46-2.24,1.36-1.19,2.68-2.61,3.47-4.2,2.06-4.16,4.19-8.36,5.59-12.76,1.31-4.15,3.56-5.74,7.72-4.87,7.33,1.53,14.66,3.06,21.98,4.6,2.77.58,5.51,1.52,8.3,1.66,1.26.07,3.42-1.2,3.69-2.24.29-1.13-.84-3.08-1.92-3.98-1.2-.99-3.01-1.38-4.63-1.72-8.46-1.79-16.96-3.4-25.4-5.27-1.64-.36-3.09-1.59-4.63-2.41.92-1.46,1.56-3.23,2.8-4.32,4.13-3.62,8.49-6.97,12.72-10.47,3.24-2.68,6.41-5.45,9.61-8.17.44.21.88.43,1.32.64-.38,3.21-.38,6.51-1.21,9.6-1.58,5.87-4.09,6.84-9.92,4.82-1.21-.42-3.23-.37-4.02.37-.84.79-1.39,3.36-.82,3.93,2.08,2.11,4.44,4.6,7.14,5.34,5.68,1.57,12.16-1.99,15.2-7.14,3.46-5.87,4.14-12.15,3.56-18.79-.29-3.27-.2-6.63.22-9.89.37-2.86,1.55-5.86-1.86-7.42ZM177.21,96.07c1.72-3.18,3.45-6.37,5.17-9.55.45.24.9.49,1.34.73l-4.74,9.75c-.59-.31-1.18-.62-1.77-.93ZM92.33,41.68c-1.1,4.86-5.02,6.64-9.3,8.02-.48-.56-.96-1.11-1.43-1.67,3.12-2.65,6.23-5.29,9.35-7.94.46.53.92,1.06,1.38,1.59Z"
        fill="#000"
        stroke-width="0"
      />
    </Svg>
  );
};
