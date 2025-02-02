import SegoeUiSemibold from '@/assets/segoe-ui-semibold.ttf';
import SegBlack from '@/assets/seguibl.ttf';
import F from '@/assets/SegUIVar.ttf';
import { TransactionExpanded } from '@/types/expanded';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

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
    fontSize: 12,
    fontFamily: "Segoe UI black",
  },
});

interface OwnProps {
  username?: string;
  startDate?: string;
  endDate?: string;
  totalSales?: string;
  totalSalesCount?: string;
  grouped: Record<string, TransactionExpanded[]>;
}

export const MyDocument = (props: OwnProps) => (
  <Document>
    <Page size={[204, 817.18]} style={styles.page} wrap={false}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Ventes</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}># Ventes : </Text>
        <Text style={styles.title}>{props.totalSalesCount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total ventes : </Text>
        <Text style={styles.title}>{props.totalSales}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Agent : </Text>
        <Text>{props.username}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={{ marginBottom: 12 }}>Clotures:</Text>

      <View>
        {Object.entries(props.grouped).map(([key, transactions]) => (
          <View key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.title}>{transactions.length} Ventes</Text>
            <Text style={styles.title}>
              {transactions.reduce((acc, cur) => acc + cur.grandTotal, 0)} DA
            </Text>
            <View style={styles.divider} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
