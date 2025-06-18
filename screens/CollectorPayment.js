import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CollectorPayment() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [inputs, setInputs] = useState({}); // Holds phone & amount for each request

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const collectorId = await AsyncStorage.getItem('userId');

        const res = await axios.get(`http://10.71.125.67:5000/api/v1/requests/collector/${collectorId}/approved`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setApprovedRequests(res.data.requests);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch approved requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleInputChange = (field, value, id) => {
    setInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      }
    }));
  };

  const handlePay = async (request) => {
    const data = inputs[request._id];
    if (!data || !data.phone || !data.amount) {
      return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://10.71.125.67:5000/api/v1/payments',
        {
          requestId: request._id,
          homeownerId: request.homeownerId,
          amount: data.amount,
          phoneNumber: data.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Payment successful.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Payment failed.');
    }
  };

  const handleDownloadReceipt = async (requestId) => {
    Alert.alert("Receipt Download", `Trigger download for receipt of request ${requestId}`);
    // Backend should expose /payments/:requestId/receipt endpoint that returns PDF or text receipt
    // Use FileSystem or Sharing module to download/view
  };

  const renderItem = ({ item }) => {
    const data = inputs[item._id] || {};
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.homeownerName}</Text>
        <Text style={styles.cell}>{item.homeownerId}</Text>
        <Text style={styles.cell}>{item._id}</Text>
        <Text style={styles.cell}>{item.scrapType}</Text>
        <Text style={styles.cell}>{item.weight} kg</Text>
        <TextInput
          style={styles.inputCell}
          placeholder="Phone"
          placeholderTextColor="#aaa"
          value={data.phone || ''}
          onChangeText={(text) => handleInputChange('phone', text, item._id)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.inputCell}
          placeholder="Amount"
          placeholderTextColor="#aaa"
          value={data.amount || ''}
          onChangeText={(text) => handleInputChange('amount', text, item._id)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
          <Text style={styles.buttonText}>Receipt</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.header}>Homeowner</Text>
          <Text style={styles.header}>Homeowner ID</Text>
          <Text style={styles.header}>Request ID</Text>
          <Text style={styles.header}>Scrap Type</Text>
          <Text style={styles.header}>Weight</Text>
          <Text style={styles.header}>Phone</Text>
          <Text style={styles.header}>Amount</Text>
          <Text style={styles.header}>Pay</Text>
          <Text style={styles.header}>Receipt</Text>
        </View>

        <FlatList
          data={approvedRequests}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}

const DARK_GREEN = '#003920';
const GREEN = '#00C851';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: DARK_GREEN,
    minWidth: 1000,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
  },
  headerRow: {
    borderBottomWidth: 2,
    borderColor: GREEN,
  },
  header: {
    color: WHITE,
    fontWeight: 'bold',
    width: 120,
    textAlign: 'center',
  },
  cell: {
    color: WHITE,
    width: 120,
    textAlign: 'center',
    fontSize: 13,
  },
  inputCell: {
    width: 120,
    padding: 6,
    backgroundColor: '#014d33',
    borderRadius: 5,
    color: WHITE,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: GREEN,
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 3,
    width: 90,
    alignItems: 'center',
  },
  receiptButton: {
    backgroundColor: '#4285F4',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 3,
    width: 90,
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
