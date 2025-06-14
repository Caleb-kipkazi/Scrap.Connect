import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

// Dummy data (simulate backend result)
const dummyData = [
  {
    id: 'REQ123',
    name: 'John Doe',
    phone: '0712345678',
    location: 'Nairobi',
    pickupDate: '2025-06-15',
    scrapType: 'Metal',
    weight: '15kg',
    image: 'https://via.placeholder.com/60',
    status: 'pending',
    scrapCentre: 'Baraton Scrap Yard',
  },
  {
    id: 'REQ124',
    name: 'Jane Smith',
    phone: '0723456789',
    location: 'Eldoret',
    pickupDate: '2025-06-16',
    scrapType: 'Plastic',
    weight: '10kg',
    image: 'https://via.placeholder.com/60',
    status: 'pending',
    scrapCentre: 'Kisumu Scrap Yard',
  },
];

export default function Trequests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterReqId, setFilterReqId] = useState('');

  // Dummy admin data — in real backend, get this from login session or token
  const loggedInAdmin = {
    email: 'admin@baratonscrap.com',
    scrapCentre: 'Baraton Scrap Yard',
  };

  useEffect(() => {
    // ✅ BACKEND INTEGRATION - Uncomment when backend is ready
    /*
    fetch(`https://your-backend-url/api/admin/requests`, {
      headers: {
        Authorization: `Bearer ${yourToken}`, // Optional if using JWT
      },
    })
      .then(res => res.json())
      .then(data => {
        const myCentreRequests = data.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);
        setRequests(myCentreRequests);
        setFilteredRequests(myCentreRequests);
      })
      .catch(err => console.error('Failed to fetch requests:', err));
    */

    // For now use dummy data
    const myCentreRequests = dummyData.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);
    setRequests(myCentreRequests);
    setFilteredRequests(myCentreRequests);
  }, []);

  useEffect(() => {
    filterAndSearch();
  }, [search, filterType, filterReqId]);

  const filterAndSearch = () => {
    let result = [...requests];

    if (filterReqId) {
      result = result.filter(req => req.id.toLowerCase().includes(filterReqId.toLowerCase()));
    }

    if (filterType) {
      result = result.filter(req => req.scrapType.toLowerCase() === filterType.toLowerCase());
    }

    if (search) {
      result = result.filter(req =>
        Object.values(req).some(value =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredRequests(result);
  };

  const toggleSort = () => {
    const sorted = [...filteredRequests].sort((a, b) => {
      const dateA = new Date(a.pickupDate);
      const dateB = new Date(b.pickupDate);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

    setFilteredRequests(sorted);
    setSortAsc(!sortAsc);
  };

  const handleApproval = (id, decision) => {
    console.log(`${decision.toUpperCase()} request ${id}`);
    
    // ✅ BACKEND INTEGRATION - Uncomment when backend is ready
    /*
    fetch(`https://your-backend-url/api/admin/requests/${id}/decision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yourToken}`, // Optional
      },
      body: JSON.stringify({ decision }),
    })
    .then(response => response.json())
    .then(result => {
      // Optionally update UI
      console.log('Request updated:', result);
    })
    .catch(error => {
      console.error('Approval error:', error);
    });
    */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Requests</Text>

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by Req ID"
          value={filterReqId}
          onChangeText={setFilterReqId}
        />
        <Picker
          selectedValue={filterType}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterType(itemValue)}
        >
          <Picker.Item label="All Scrap Types" value="" />
          <Picker.Item label="Metal" value="Metal" />
          <Picker.Item label="Plastic" value="Plastic" />
          <Picker.Item label="Paper" value="Paper" />
        </Picker>
        <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
          <FontAwesome name="sort" size={18} color="white" />
          <Text style={styles.sortText}>Sort by Date</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Req ID</Text>
            <Text style={styles.cell}>Full Name</Text>
            <Text style={styles.cell}>Phone</Text>
            <Text style={styles.cell}>Location</Text>
            <Text style={styles.cell}>Pickup Date</Text>
            <Text style={styles.cell}>Type</Text>
            <Text style={styles.cell}>Weight</Text>
            <Text style={styles.cell}>Image</Text>
            <Text style={styles.cell}>Action</Text>
          </View>

          {filteredRequests.map((req, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{req.id}</Text>
              <Text style={styles.cell}>{req.name}</Text>
              <Text style={styles.cell}>{req.phone}</Text>
              <Text style={styles.cell}>{req.location}</Text>
              <Text style={styles.cell}>{req.pickupDate}</Text>
              <Text style={styles.cell}>{req.scrapType}</Text>
              <Text style={styles.cell}>{req.weight}</Text>
              <Image source={{ uri: req.image }} style={styles.scrapImage} />
              <View style={styles.actionCell}>
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => handleApproval(req.id, 'approve')}
                >
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleApproval(req.id, 'reject')}
                >
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  searchInput: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: '45%',
    marginBottom: 5,
  },
  filterInput: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: '45%',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: '45%',
    borderWidth: 1,
    borderColor: 'green',
    color: 'black',
    marginBottom: 5,
  },
  sortBtn: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
    marginBottom: 5,
  },
  sortText: {
    color: 'white',
    marginLeft: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    width: 100,
    paddingHorizontal: 4,
    color: 'black',
  },
  scrapImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  actionCell: {
    flexDirection: 'row',
    gap: 5,
  },
  approveBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  rejectBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
  },
});
