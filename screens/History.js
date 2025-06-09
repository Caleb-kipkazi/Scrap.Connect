import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  useColorScheme
} from 'react-native';

const mockRequests = [
  { id: 'REQ001', date: '2025-05-20', location: 'Block A', scrapType: 'Metal', status: 'Approved' },
  { id: 'REQ002', date: '2025-05-21', location: 'Block B', scrapType: 'Plastic', status: 'Pending' },
  { id: 'REQ003', date: '2025-05-22', location: 'Block C', scrapType: 'Glass', status: 'Approved' },
  { id: 'REQ004', date: '2025-05-23', location: 'Block D', scrapType: 'Electronics', status: 'Pending' },
];

const tabs = ['All', 'Approved', 'Pending'];

const RequestCard = ({ request }) => {
  const isApproved = request.status === 'Approved';
  const isPending = request.status === 'Pending';

  return (
    <View style={{
      backgroundColor: '#fff',
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>#{request.id}</Text>
      <Text>Date: {request.date}</Text>
      <Text>Location: {request.location}</Text>
      <Text>Scrap Type: {request.scrapType}</Text>
      <Text style={{
        marginTop: 4,
        color: isApproved ? 'green' : isPending ? 'orange' : 'black',
        fontWeight: 'bold'
      }}>
        Status: {request.status}
      </Text>
    </View>
  );
};

const RequestHistory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scheme = useColorScheme();
  const themeBg = scheme === 'dark' ? '#1e1e1e' : '#f8f9fa';
  const textColor = scheme === 'dark' ? '#f1f1f1' : '#1e1e1e';

  // Step 1: Filter by status tab
  const filteredByStatus = activeTab === 'All'
    ? mockRequests
    : mockRequests.filter(req => req.status === activeTab);

  // Step 2: Further filter by search query
  const filteredRequests = filteredByStatus.filter(req =>
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.scrapType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: themeBg }}>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: activeTab === tab ? '#007bff' : '#e0e0e0',
              borderRadius: 20,
            }}
          >
            <Text style={{
              color: activeTab === tab ? '#fff' : '#333',
              fontWeight: '600'
            }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Input */}
      <View style={{
        marginHorizontal: 16,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2
      }}>
        <TextInput
          placeholder="Search by ID, Scrap Type, or Location"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            fontSize: 16,
            color: textColor,
          }}
        />
      </View>

      {/* Requests List */}
      <FlatList
        data={filteredRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RequestCard request={item} />}
        ListEmptyComponent={() => (
          <Text style={{
            textAlign: 'center',
            marginTop: 30,
            color: textColor
          }}>
            No {activeTab} requests found.
          </Text>
        )}
      />
    </View>
  );
};

export default RequestHistory;
