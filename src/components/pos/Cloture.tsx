import SegoeUiSemibold from "@/assets/segoe-ui-semibold.ttf";
import SegBlack from "@/assets/seguibl.ttf";
import F from "@/assets/SegUIVar.ttf";
import { TopSale } from "@/components/hooks/useGetTopSales";
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
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: 10,
    fontSize: 12,
    fontFamily: "Segoe UI regular",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleWrap: {
    flex: 2,
  },
  title: {
    fontFamily: "Segoe UI semi-bold",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    fontFamily: "Segoe UI semi-bold",
  },
  black: {
    fontSize: 14,
    fontFamily: "Segoe UI black",
  },

  table: {},
  nameColumn: { flex: 3 },
  code: { flex: 1 },
  qteColumn: { flex: 1, textAlign: "right" },
  codeColumnValue: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  nameColumnValue: {
    flex: 3,
    fontSize: 10,
    fontFamily: "Segoe UI semi-bold",
  },
  qteColumnValue: {
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
});

interface OwnProps {
  username?: string;
  startDate?: string;
  endDate?: string;
  fondDeCaisse?: string;
  totalSales?: string;
  balance?: string;
  topSales: TopSale[];
}

export const MyDocument = (props: OwnProps) => (
  <Document>
    <Page size={[204, 817.18]} style={styles.page} wrap={false}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Clotûre de caisse</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Ouverture : </Text>
        <Text>{`${props.startDate}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Fermeture : </Text>
        <Text>{`${props.endDate}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Agent : </Text>
        <Text>{props.username}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Fond de caisse : </Text>
        <Text style={styles.black}>{props.fondDeCaisse}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total ventes : </Text>
        <Text style={styles.black}>{props.totalSales}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Balance : </Text>
        <Text style={styles.black}>{props.balance}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={styles.code}>
            <Text style={styles.columnHeader}>Code</Text>
          </View>
          <View style={styles.nameColumn}>
            <Text style={styles.columnHeader}>Nom</Text>
          </View>
          <View style={styles.qteColumn}>
            <Text style={styles.columnHeader}>Qte</Text>
          </View>
        </View>
        <View style={styles.tableBody}>
          {props.topSales.map((topSale) => (
            <View key={topSale.productId} style={styles.tableHeader}>
              <View style={styles.codeColumnValue}>
                <Text>{topSale.code}</Text>
              </View>
              <View style={styles.nameColumnValue}>
                <Text>{topSale.productName}</Text>
              </View>
              <View style={styles.qteColumnValue}>
                <Text>{topSale.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
