import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Reports() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    assigned: 0,
    totalWeight: 0,
  });

  const [collectorStats, setCollectorStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Function to fetch reports from backend
  const fetchReports = async () => {
    try {
      console.log('📱 Starting to fetch reports...');
      
      // Get admin token from AsyncStorage
      const adminToken = await AsyncStorage.getItem('adminToken');
      
      if (!adminToken) {
        console.log('❌ No admin token found');
        Alert.alert('Session Expired', 'Please log in again.', [
          { text: 'OK', onPress: () => navigation.navigate('AdminLogin') }
        ]);
        return;
      }

      console.log('🎫 Admin token found, making API call...');

      // Make API call to backend
      const response = await fetch('http://192.168.189.119:5000/api/v1/report/center/summary', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('❌ API Error:', errorData);
        
        if (response.status === 401 || response.status === 403) {
          Alert.alert('Session Expired', 'Please log in again.', [
            { text: 'OK', onPress: () => {
              AsyncStorage.clear();
              navigation.navigate('AdminLogin');
            }}
          ]);
          return;
        }
        
        throw new Error(errorData.message || 'Failed to fetch reports');
      }

      const data = await response.json();
      console.log('📊 Received data:', data);

      // Update state with fetched data
      setStats({
        total: data.summary?.total || 0,
        approved: data.summary?.approved || 0,
        rejected: data.summary?.rejected || 0,
        pending: data.summary?.pending || 0,
        assigned: data.summary?.assigned || 0,
        totalWeight: data.summary?.totalWeight || 0,
      });

      setCollectorStats(data.collectorStats || []);

    } catch (error) {
      console.error('❌ Error fetching reports:', error);
      Alert.alert('Error', 'Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch data when component mounts or screen comes into focus
  useEffect(() => {
    if (isFocused) {
      fetchReports();
    }
  }, [isFocused]);

  // Pull to refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  // Render collector row
  const renderCollectorRow = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>#{index + 1}</Text>
      </View>
      <View style={styles.collectorInfo}>
        <Text style={styles.collectorName}>{item.name}</Text>
        <Text style={styles.collectorDetails}>
          {item.requestsHandled} requests • {item.weight} kg
        </Text>
      </View>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading reports...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>📊 Center Reports</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.card, styles.totalCard]}>
          <Text style={styles.cardTitle}>Total Requests</Text>
          <Text style={styles.cardValue}>{stats.total}</Text>
        </View>
        
        <View style={[styles.card, styles.approvedCard]}>
          <Text style={styles.cardTitle}>Approved</Text>
          <Text style={styles.cardValue}>{stats.approved}</Text>
        </View>
        
        <View style={[styles.card, styles.rejectedCard]}>
          <Text style={styles.cardTitle}>Rejected</Text>
          <Text style={styles.cardValue}>{stats.rejected}</Text>
        </View>
        
        <View style={[styles.card, styles.pendingCard]}>
          <Text style={styles.cardTitle}>Pending</Text>
          <Text style={styles.cardValue}>{stats.pending}</Text>
        </View>
        
        <View style={[styles.card, styles.assignedCard]}>
          <Text style={styles.cardTitle}>Assigned</Text>
          <Text style={styles.cardValue}>{stats.assigned}</Text>
        </View>
        
        <View style={[styles.card, styles.weightCard]}>
          <Text style={styles.cardTitle}>Total Weight</Text>
          <Text style={styles.cardValue}>{stats.totalWeight} kg</Text>
        </View>
      </View>

      {/* Collector Performance */}
      <Text style={styles.subHeader}>🏆 Top Collectors</Text>
      
      {collectorStats.length > 0 ? (
        <View style={styles.collectorContainer}>
          <FlatList
            data={collectorStats}
            renderItem={renderCollectorRow}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No collector data available</Text>
          <Text style={styles.emptySubText}>Collectors will appear here once requests are assigned</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    margin: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  card: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalCard: { backgroundColor: '#E3F2FD' },
  approvedCard: { backgroundColor: '#E8F5E9' },
  rejectedCard: { backgroundColor: '#FFEBEE' },
  pendingCard: { backgroundColor: '#FFF3E0' },
  assignedCard: { backgroundColor: '#F3E5F5' },
  weightCard: { backgroundColor: '#E0F2F1' },
  
  cardTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#2E7D32',
  },
  collectorContainer: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  collectorInfo: {
    flex: 1,
  },
  collectorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  collectorDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});