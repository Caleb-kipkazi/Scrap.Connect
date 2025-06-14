import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

export default function Assign() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [collectorMap, setCollectorMap] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dummyRequests = [
    {
      id: 'REQ001',
      name: 'John Doe',
      phone: '0712345678',
      location: 'Nairobi',
      date: '2025-06-15',
      type: 'Metal',
      weight: '50kg',
      image: 'https://via.placeholder.com/300', // larger image URL
      status: 'Approved',
      centre: 'West Nairobi Centre',
    },
    {
      id: 'REQ002',
      name: 'Alice Kimani',
      phone: '0798765432',
      location: 'Eldoret',
      date: '2025-06-17',
      type: 'Plastic',
      weight: '30kg',
      image: 'https://via.placeholder.com/300',
      status: 'Approved',
      centre: 'Eldoret Town Centre',
    },
  ];

  const collectorOptions = {
    'West Nairobi Centre': ['Collins Otieno', 'Jane Njeri'],
    'Eldoret Town Centre': ['Peter Kipkoech', 'Faith Chebet'],
  };

  useEffect(() => {
    setApprovedRequests(dummyRequests);
    setFilteredRequests(dummyRequests);
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    setSearchQuery(lower);
    const filtered = approvedRequests.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(lower);
      const collector = collectorMap[item.id] || '';
      const collectorMatch = collector.toLowerCase().includes(lower);
      return nameMatch || collectorMatch;
    });
    setFilteredRequests(filtered);
  };

  const handleAssignChange = (requestId, collectorName) => {
    setCollectorMap((prev) => ({ ...prev, [requestId]: collectorName }));
    // Commented backend logic
    /*
    fetch('/api/assign', {
      method: 'POST',
      body: JSON.stringify({ requestId, collectorName }),
    });
    */
  };

  const openImageModal = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.phone}</Text>
      <Text style={styles.cell}>{item.location}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.weight}</Text>
      <TouchableOpacity onPress={() => openImageModal(item.image)} style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.cell}>
        <Picker
          selectedValue={collectorMap[item.id] || ''}
          style={styles.picker}
          onValueChange={(value) => handleAssignChange(item.id, value)}
        >
          <Picker.Item label="Assign Collector" value="" />
          {(collectorOptions[item.centre] || []).map((collector) => (
            <Picker.Item key={collector} label={collector} value={collector} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assign</Text>
      <Text style={styles.subHeader}>
        Here you can assign approved requests to scrap collectors
      </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by homeowner or collector name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.tableHeader}>
        <Text style={styles.cellHeader}>Req ID</Text>
        <Text style={styles.cellHeader}>Name</Text>
        <Text style={styles.cellHeader}>Phone</Text>
        <Text style={styles.cellHeader}>Location</Text>
        <Text style={styles.cellHeader}>Date</Text>
        <Text style={styles.cellHeader}>Type</Text>
        <Text style={styles.cellHeader}>Weight</Text>
        <Text style={styles.cellHeader}>Image</Text>
        <Text style={styles.cellHeader}>Assign</Text>
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No matching results found.</Text>}
      />

      {/* Modal Image Viewer */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
        </View>
      </Modal>
    </View>
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
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
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
    flexWrap: 'wrap',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  picker: {
    height: 40,
    width: '100%',
    color: 'black',
  },
  imageWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
  },
});
