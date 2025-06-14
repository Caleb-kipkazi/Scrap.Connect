import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Ahistory() {
  const [approvedSearch, setApprovedSearch] = useState('');
  const [rejectedSearch, setRejectedSearch] = useState('');
  const [approvedFiltered, setApprovedFiltered] = useState([]);
  const [rejectedFiltered, setRejectedFiltered] = useState([]);

  // Temporary dummy data for UI testing
  const dummyApproved = [
    {
      reqId: 'REQ001',
      pickupDate: '2025-06-15',
      homeownerName: 'John Doe',
      collectorName: 'Collins Otieno',
    },
    {
      reqId: 'REQ002',
      pickupDate: '2025-06-17',
      homeownerName: 'Alice Kimani',
      collectorName: 'Faith Chebet',
    },
  ];

  const dummyRejected = [
    { reqId: 'REQ010', homeownerName: 'Brian Mwangi' },
    { reqId: 'REQ011', homeownerName: 'Nancy Wairimu' },
  ];

  useEffect(() => {
    // ⚠️ Backend logic: Fetch from backend when ready
    /*
    fetch('http://your-backend-url/api/requests/history')
      .then((res) => res.json())
      .then((data) => {
        setApprovedFiltered(data.approved);
        setRejectedFiltered(data.rejected);
      })
      .catch((err) => console.error(err));
    */

    // For now, use dummy data
    setApprovedFiltered(dummyApproved);
    setRejectedFiltered(dummyRejected);
  }, []);

  const handleApprovedSearch = (text) => {
    setApprovedSearch(text);
    const query = text.toLowerCase();
    const filtered = dummyApproved.filter(
      (item) =>
        item.reqId.toLowerCase().includes(query) ||
        item.homeownerName.toLowerCase().includes(query) ||
        item.collectorName.toLowerCase().includes(query)
    );
    setApprovedFiltered(filtered);
  };

  const handleRejectedSearch = (text) => {
    setRejectedSearch(text);
    const query = text.toLowerCase();
    const filtered = dummyRejected.filter(
      (item) =>
        item.reqId.toLowerCase().includes(query) ||
        item.homeownerName.toLowerCase().includes(query)
    );
    setRejectedFiltered(filtered);
  };

  const renderApprovedItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.reqId}</Text>
      <Text style={styles.cell}>{item.pickupDate}</Text>
      <Text style={styles.cell}>{item.homeownerName}</Text>
      <Text style={styles.cell}>{item.collectorName}</Text>
    </View>
  );

  const renderRejectedItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.reqId}</Text>
      <Text style={styles.cell}>{item.homeownerName}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Approved Section */}
      <Text style={styles.header}>Approved Requests</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Req ID, Homeowner or Collector"
        value={approvedSearch}
        onChangeText={handleApprovedSearch}
      />
      <View style={styles.tableHeader}>
        <Text style={styles.cellHeader}>Req ID</Text>
        <Text style={styles.cellHeader}>Pick-up Date</Text>
        <Text style={styles.cellHeader}>Homeowner</Text>
        <Text style={styles.cellHeader}>Collector</Text>
      </View>
      <FlatList
        data={approvedFiltered}
        renderItem={renderApprovedItem}
        keyExtractor={(item) => item.reqId}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No approved requests found.</Text>}
      />

      {/* Rejected Section */}
      <Text style={[styles.header, { marginTop: 30 }]}>Rejected Requests</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Req ID or Homeowner"
        value={rejectedSearch}
        onChangeText={handleRejectedSearch}
      />
      <View style={styles.tableHeader}>
        <Text style={styles.cellHeader}>Req ID</Text>
        <Text style={styles.cellHeader}>Homeowner</Text>
      </View>
      <FlatList
        data={rejectedFiltered}
        renderItem={renderRejectedItem}
        keyExtractor={(item) => item.reqId}
        scrollEnabled={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No rejected requests found.</Text>}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
    alignItems: 'center',
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
