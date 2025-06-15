import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Modal, Image, TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios'; // Uncomment when backend is ready

const dummyRequests = [
  {
    id: 'REQ001',
    name: 'John Doe',
    phone: '0712345678',
    location: 'Eldoret, Kenya',
    date: '2025-06-18',
    scrapType: 'Plastic',
    weight: '10kg',
    image: 'https://via.placeholder.com/150',
    status: 'pending',
  },
  {
    id: 'REQ002',
    name: 'Jane Kim',
    phone: '0798765432',
    location: 'Nairobi, Kenya',
    date: '2025-06-20',
    scrapType: 'Metal',
    weight: '15kg',
    image: 'https://via.placeholder.com/150',
    status: 'completed',
  },
  // Add more dummy data
];

export default function Pickups() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Fetch assigned pickups from backend
    // const fetchRequests = async () => {
    //   try {
    //     const res = await axios.get(`http://yourapi/collector/pickups`, {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     setRequests(res.data);
    //     setFilteredRequests(res.data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // fetchRequests();

    // Dummy data fallback
    setRequests(dummyRequests);
    setFilteredRequests(dummyRequests);
  }, []);

  useEffect(() => {
    const filtered = requests.filter(req => {
      const matchSearch = Object.values(req).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchStatus =
        filterStatus === 'All' || req.status === filterStatus.toLowerCase();
      return matchSearch && matchStatus;
    });

    setFilteredRequests(filtered);
  }, [searchQuery, filterStatus, requests]);

  const toggleStatus = (index) => {
    const updatedRequests = [...requests];
    const actualIndex = requests.findIndex(r => r.id === filteredRequests[index].id);
    updatedRequests[actualIndex].status =
      updatedRequests[actualIndex].status === 'pending' ? 'completed' : 'pending';
    setRequests(updatedRequests);

    // Update backend if needed
    // axios.put(`http://yourapi/collector/pickup/${updatedRequests[actualIndex].id}/status`, {
    //   status: updatedRequests[actualIndex].status
    // });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Assigned Pickups</Text>

      {/* Search & Filter */}
      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by any field..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterTabs}>
          {['All', 'Pending', 'Completed'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filterStatus === status && styles.activeFilter
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={styles.filterText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          {['Request ID', 'Name', 'Phone', 'Location', 'Date', 'Scrap', 'Weight', 'Image', 'Status'].map((header) => (
            <Text key={header} style={styles.headerText}>{header}</Text>
          ))}
        </View>

        {filteredRequests.map((item, index) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.phone}</Text>
            <Text style={styles.cell}>{item.location}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.scrapType}</Text>
            <Text style={styles.cell}>{item.weight}</Text>

            {/* Image Viewer */}
            <TouchableOpacity style={styles.cell} onPress={() => setSelectedImage(item.image)}>
              <Ionicons name="image-outline" size={24} color="gray" />
            </TouchableOpacity>

            {/* Status Toggle */}
            <TouchableOpacity
              style={[
                styles.statusButton,
                item.status === 'pending' ? styles.pending : styles.completed,
              ]}
              onPress={() => toggleStatus(index)}
            >
              <Text style={styles.statusText}>
                {item.status === 'pending' ? 'Pending' : 'Completed'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Image Modal */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
            <Ionicons name="close-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2e7d32',
    textAlign: 'center',
  },
  controls: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#4caf50',
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#2e7d32',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 2,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  pending: {
    backgroundColor: '#fbc02d',
  },
  completed: {
    backgroundColor: '#43a047',
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '60%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
  },
});
