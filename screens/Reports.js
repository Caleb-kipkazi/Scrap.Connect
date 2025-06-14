import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function Reports() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    assigned: 0,
    totalWeight: 0,
  });

  const [collectorStats, setCollectorStats] = useState([]);

  useEffect(() => {
    // ⚠️ Backend logic: Fetch report stats
    /*
    fetch('http://your-backend-url/api/reports/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data.summary);
        setCollectorStats(data.collectorBreakdown);
      })
      .catch(err => console.error(err));
    */

    // Dummy data for now
    setStats({
      total: 150,
      approved: 120,
      rejected: 30,
      assigned: 90,
      totalWeight: 2380, // in kg
    });

    setCollectorStats([
      { name: 'Collins Otieno', requestsHandled: 30, weight: 750 },
      { name: 'Faith Chebet', requestsHandled: 25, weight: 600 },
    ]);
  }, []);

  const renderCollectorRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.requestsHandled}</Text>
      <Text style={styles.cell}>{item.weight} kg</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Reports</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}><Text style={styles.cardTitle}>Total Requests</Text><Text style={styles.cardValue}>{stats.total}</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>Approved</Text><Text style={styles.cardValue}>{stats.approved}</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>Rejected</Text><Text style={styles.cardValue}>{stats.rejected}</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>Assigned</Text><Text style={styles.cardValue}>{stats.assigned}</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>Total Weight</Text><Text style={styles.cardValue}>{stats.totalWeight} kg</Text></View>
      </View>

      {/* Collector Breakdown */}
      <Text style={styles.subHeader}>Collector Performance</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.cellHeader}>Collector</Text>
        <Text style={styles.cellHeader}>Requests</Text>
        <Text style={styles.cellHeader}>Weight</Text>
      </View>
      <FlatList
        data={collectorStats}
        renderItem={renderCollectorRow}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No collector data found.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: 'black',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 5,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
});
