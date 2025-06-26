import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Collectors = () => {
  const [collectors, setCollectors] = useState([]);
  const [filteredCollectors, setFilteredCollectors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchCollectors = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const centerId = await AsyncStorage.getItem('centerId');
      const response = await axios.get(
        `http://192.168.189.119:5000/api/v1/center/collectors/${centerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fetched = response.data.collectors || [];
      setCollectors(fetched);
      setFilteredCollectors(fetched);
    } catch (error) {
      console.error('Error fetching collectors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const query = text.toLowerCase();
    const filtered = collectors.filter(
      (item) =>
        item.fullName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
    setFilteredCollectors(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={24} color="#6366F1" />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={16} color="#8B5CF6" />
          <Text style={styles.detail}>{item.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#06B6D4" />
          <Text style={styles.detail}>{item.phoneNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#F59E0B" />
          <Text style={styles.detail}>Joined {formatDate(item.createdAt)}</Text>
        </View>
      </View>
    </View>
  );

  const handleAddCollector = () => {
    navigation.navigate('CollectorSignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Center Collectors</Text>
          <Text style={styles.subheading}>Manage your collection team</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCollector}>
          <Ionicons name="add-circle" size={22} color="white" />
          <Text style={styles.addButtonText}>Add Collector</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or email..."
        placeholderTextColor="#94A3B8"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading collectors...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCollectors}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Collectors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  subheading: {
    fontSize: 14,
    color: '#64748B',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#E0E7FF',
    padding: 10,
    borderRadius: 25,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  username: {
    fontSize: 14,
    color: '#94A3B8',
  },
  detailsContainer: {
    marginLeft: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },
});
