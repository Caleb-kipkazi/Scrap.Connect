// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// // // import { Picker } from '@react-native-picker/picker';
// // // import { FontAwesome } from '@expo/vector-icons';

// // // // Dummy data (simulate backend result)
// // // const dummyData = [
// // //   {
// // //     id: 'REQ123',
// // //     name: 'John Doe',
// // //     phone: '0712345678',
// // //     location: 'Nairobi',
// // //     pickupDate: '2025-06-15',
// // //     scrapType: 'Metal',
// // //     weight: '15kg',
// // //     image: 'https://via.placeholder.com/60',
// // //     status: 'pending',
// // //     scrapCentre: 'Baraton Scrap Yard',
// // //   },
// // //   {
// // //     id: 'REQ124',
// // //     name: 'Jane Smith',
// // //     phone: '0723456789',
// // //     location: 'Eldoret',
// // //     pickupDate: '2025-06-16',
// // //     scrapType: 'Plastic',
// // //     weight: '10kg',
// // //     image: 'https://via.placeholder.com/60',
// // //     status: 'pending',
// // //     scrapCentre: 'Kisumu Scrap Yard',
// // //   },
// // // ];

// // // export default function Trequests() {
// // //   const [requests, setRequests] = useState([]);
// // //   const [filteredRequests, setFilteredRequests] = useState([]);
// // //   const [search, setSearch] = useState('');
// // //   const [sortAsc, setSortAsc] = useState(true);
// // //   const [filterType, setFilterType] = useState('');
// // //   const [filterReqId, setFilterReqId] = useState('');

// // //   // Dummy admin data — in real backend, get this from login session or token
// // //   const loggedInAdmin = {
// // //     email: 'admin@baratonscrap.com',
// // //     scrapCentre: 'Baraton Scrap Yard',
// // //   };

// // //   useEffect(() => {
// // //     // ✅ BACKEND INTEGRATION - Uncomment when backend is ready
// // //     /*
// // //     fetch(`https://your-backend-url/api/admin/requests`, {
// // //       headers: {
// // //         Authorization: `Bearer ${yourToken}`, // Optional if using JWT
// // //       },
// // //     })
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         const myCentreRequests = data.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);
// // //         setRequests(myCentreRequests);
// // //         setFilteredRequests(myCentreRequests);
// // //       })
// // //       .catch(err => console.error('Failed to fetch requests:', err));
// // //     */

// // //     // For now use dummy data
// // //     const myCentreRequests = dummyData.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);
// // //     setRequests(myCentreRequests);
// // //     setFilteredRequests(myCentreRequests);
// // //   }, []);

// // //   useEffect(() => {
// // //     filterAndSearch();
// // //   }, [search, filterType, filterReqId]);

// // //   const filterAndSearch = () => {
// // //     let result = [...requests];

// // //     if (filterReqId) {
// // //       result = result.filter(req => req.id.toLowerCase().includes(filterReqId.toLowerCase()));
// // //     }

// // //     if (filterType) {
// // //       result = result.filter(req => req.scrapType.toLowerCase() === filterType.toLowerCase());
// // //     }

// // //     if (search) {
// // //       result = result.filter(req =>
// // //         Object.values(req).some(value =>
// // //           String(value).toLowerCase().includes(search.toLowerCase())
// // //         )
// // //       );
// // //     }

// // //     setFilteredRequests(result);
// // //   };

// // //   const toggleSort = () => {
// // //     const sorted = [...filteredRequests].sort((a, b) => {
// // //       const dateA = new Date(a.pickupDate);
// // //       const dateB = new Date(b.pickupDate);
// // //       return sortAsc ? dateA - dateB : dateB - dateA;
// // //     });

// // //     setFilteredRequests(sorted);
// // //     setSortAsc(!sortAsc);
// // //   };

// // //   const handleApproval = (id, decision) => {
// // //     console.log(`${decision.toUpperCase()} request ${id}`);
    
// // //     // ✅ BACKEND INTEGRATION - Uncomment when backend is ready
// // //     /*
// // //     fetch(`https://your-backend-url/api/admin/requests/${id}/decision`, {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         Authorization: `Bearer ${yourToken}`, // Optional
// // //       },
// // //       body: JSON.stringify({ decision }),
// // //     })
// // //     .then(response => response.json())
// // //     .then(result => {
// // //       // Optionally update UI
// // //       console.log('Request updated:', result);
// // //     })
// // //     .catch(error => {
// // //       console.error('Approval error:', error);
// // //     });
// // //     */
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Total Requests</Text>

// // //       <View style={styles.controls}>
// // //         <TextInput
// // //           style={styles.searchInput}
// // //           placeholder="Search..."
// // //           value={search}
// // //           onChangeText={setSearch}
// // //         />
// // //         <TextInput
// // //           style={styles.filterInput}
// // //           placeholder="Filter by Req ID"
// // //           value={filterReqId}
// // //           onChangeText={setFilterReqId}
// // //         />
// // //         <Picker
// // //           selectedValue={filterType}
// // //           style={styles.picker}
// // //           onValueChange={(itemValue) => setFilterType(itemValue)}
// // //         >
// // //           <Picker.Item label="All Scrap Types" value="" />
// // //           <Picker.Item label="Metal" value="Metal" />
// // //           <Picker.Item label="Plastic" value="Plastic" />
// // //           <Picker.Item label="Paper" value="Paper" />
// // //         </Picker>
// // //         <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
// // //           <FontAwesome name="sort" size={18} color="white" />
// // //           <Text style={styles.sortText}>Sort by Date</Text>
// // //         </TouchableOpacity>
// // //       </View>

// // //       <ScrollView horizontal>
// // //         <View>
// // //           <View style={styles.tableHeader}>
// // //             <Text style={styles.cell}>Req ID</Text>
// // //             <Text style={styles.cell}>Full Name</Text>
// // //             <Text style={styles.cell}>Phone</Text>
// // //             <Text style={styles.cell}>Location</Text>
// // //             <Text style={styles.cell}>Pickup Date</Text>
// // //             <Text style={styles.cell}>Type</Text>
// // //             <Text style={styles.cell}>Weight</Text>
// // //             <Text style={styles.cell}>Image</Text>
// // //             <Text style={styles.cell}>Action</Text>
// // //           </View>

// // //           {filteredRequests.map((req, index) => (
// // //             <View key={index} style={styles.row}>
// // //               <Text style={styles.cell}>{req.id}</Text>
// // //               <Text style={styles.cell}>{req.name}</Text>
// // //               <Text style={styles.cell}>{req.phone}</Text>
// // //               <Text style={styles.cell}>{req.location}</Text>
// // //               <Text style={styles.cell}>{req.pickupDate}</Text>
// // //               <Text style={styles.cell}>{req.scrapType}</Text>
// // //               <Text style={styles.cell}>{req.weight}</Text>
// // //               <Image source={{ uri: req.image }} style={styles.scrapImage} />
// // //               <View style={styles.actionCell}>
// // //                 <TouchableOpacity
// // //                   style={styles.approveBtn}
// // //                   onPress={() => handleApproval(req.id, 'approve')}
// // //                 >
// // //                   <Text style={styles.btnText}>Approve</Text>
// // //                 </TouchableOpacity>
// // //                 <TouchableOpacity
// // //                   style={styles.rejectBtn}
// // //                   onPress={() => handleApproval(req.id, 'reject')}
// // //                 >
// // //                   <Text style={styles.btnText}>Reject</Text>
// // //                 </TouchableOpacity>
// // //               </View>
// // //             </View>
// // //           ))}
// // //         </View>
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //     padding: 10,
// // //   },
// // //   header: {
// // //     fontSize: 24,
// // //     color: 'green',
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //     alignSelf: 'center',
// // //   },
// // //   controls: {
// // //     flexDirection: 'row',
// // //     flexWrap: 'wrap',
// // //     marginBottom: 10,
// // //     justifyContent: 'space-between',
// // //   },
// // //   searchInput: {
// // //     borderColor: 'green',
// // //     borderWidth: 1,
// // //     padding: 6,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     marginBottom: 5,
// // //   },
// // //   filterInput: {
// // //     borderColor: 'green',
// // //     borderWidth: 1,
// // //     padding: 6,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     marginBottom: 5,
// // //   },
// // //   picker: {
// // //     height: 40,
// // //     width: '45%',
// // //     borderWidth: 1,
// // //     borderColor: 'green',
// // //     color: 'black',
// // //     marginBottom: 5,
// // //   },
// // //   sortBtn: {
// // //     flexDirection: 'row',
// // //     backgroundColor: 'black',
// // //     padding: 8,
// // //     borderRadius: 5,
// // //     alignItems: 'center',
// // //     width: '45%',
// // //     marginBottom: 5,
// // //   },
// // //   sortText: {
// // //     color: 'white',
// // //     marginLeft: 5,
// // //   },
// // //   tableHeader: {
// // //     flexDirection: 'row',
// // //     backgroundColor: 'green',
// // //     padding: 6,
// // //   },
// // //   row: {
// // //     flexDirection: 'row',
// // //     padding: 6,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#ddd',
// // //   },
// // //   cell: {
// // //     width: 100,
// // //     paddingHorizontal: 4,
// // //     color: 'black',
// // //   },
// // //   scrapImage: {
// // //     width: 60,
// // //     height: 60,
// // //     borderRadius: 5,
// // //   },
// // //   actionCell: {
// // //     flexDirection: 'row',
// // //     gap: 5,
// // //   },
// // //   approveBtn: {
// // //     backgroundColor: 'green',
// // //     paddingHorizontal: 6,
// // //     paddingVertical: 4,
// // //     borderRadius: 4,
// // //     marginRight: 4,
// // //   },
// // //   rejectBtn: {
// // //     backgroundColor: 'red',
// // //     paddingHorizontal: 6,
// // //     paddingVertical: 4,
// // //     borderRadius: 4,
// // //   },
// // //   btnText: {
// // //     color: 'white',
// // //   },
// // // });

// // //restracture
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import { FontAwesome, AntDesign } from '@expo/vector-icons';
// // import { useNavigation } from '@react-navigation/native';

// // // Dummy data (simulate backend result) - Keep this consistent across both files for now
// // const dummyData = [
// //   {
// //     id: 'REQ123',
// //     name: 'John Doe',
// //     phone: '0712345678',
// //     location: 'Nairobi',
// //     pickupDate: '2025-06-15',
// //     scrapType: 'Metal',
// //     weight: '15kg',
// //     image: 'https://via.placeholder.com/100', // Larger image for details if needed
// //     status: 'pending',
// //     scrapCentre: 'Baraton Scrap Yard',
// //     description: 'Mixed metal scrap from construction site. Ready for immediate pickup.',
// //   },
// //   {
// //     id: 'REQ124',
// //     name: 'Jane Smith',
// //     phone: '0723456789',
// //     location: 'Eldoret',
// //     pickupDate: '2025-06-16',
// //     scrapType: 'Plastic',
// //     weight: '10kg',
// //     image: 'https://via.placeholder.com/100',
// //     status: 'pending',
// //     scrapCentre: 'Kisumu Scrap Yard', // This won't show in our admin's view
// //     description: 'Various plastic bottles and containers. Flexible pickup time.',
// //   },
// //   {
// //     id: 'REQ125',
// //     name: 'Alice Johnson',
// //     phone: '0700112233',
// //     location: 'Nakuru',
// //     pickupDate: '2025-06-17',
// //     scrapType: 'Paper',
// //     weight: '5kg',
// //     image: 'https://via.placeholder.com/100',
// //     status: 'pending',
// //     scrapCentre: 'Baraton Scrap Yard',
// //     description: 'Old newspapers and cardboard boxes. Needs to be picked up by evening.',
// //   },
// //   {
// //     id: 'REQ126',
// //     name: 'Bob Williams',
// //     phone: '0788990011',
// //     location: 'Nairobi',
// //     pickupDate: '2025-06-18',
// //     scrapType: 'E-waste',
// //     weight: '20kg',
// //     image: 'https://via.placeholder.com/100',
// //     status: 'pending',
// //     scrapCentre: 'Baraton Scrap Yard',
// //     description: 'Old computer parts and small electronics. Fragile, requires careful handling.',
// //   },
// // ];

// // // Define a consistent color palette (same as before)
// // const Colors = {
// //     primary: '#004225', // Dark Green
// //     secondary: '#3CB371', // Medium Green
// //     accent: '#FFD700', // Gold/Yellow for highlights
// //     white: '#FFFFFF',
// //     lightGray: '#F0F0F0',
// //     mediumGray: '#CCCCCC',
// //     darkGray: '#333333',
// //     red: '#DC3545', // Danger
// //     green: '#28A745', // Success
// //     blue: '#007BFF', // Info
// // };

// // export default function Trequests({ navigation }) { // Ensure navigation prop is available
// //   const [requests, setRequests] = useState([]);
// //   const [filteredRequests, setFilteredRequests] = useState([]);
// //   const [search, setSearch] = useState('');
// //   const [sortAsc, setSortAsc] = useState(true);
// //   const [filterType, setFilterType] = useState('');
// //   const [filterReqId, setFilterReqId] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   // Dummy admin data — in real backend, get this from login session or token
// //   const loggedInAdmin = {
// //     email: 'admin@baratonscrap.com',
// //     scrapCentre: 'Baraton Scrap Yard', // Assuming this comes from your admin login info
// //     centerId: 'someCenterIdFromAuth', // You'll need this for actual API calls
// //   };

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       setLoading(true);
// //       try {
// //         // ✅ BACKEND INTEGRATION - Replace with your actual backend call
// //         // const response = await fetch(`http://your-backend-url/api/v1/center/requests/${loggedInAdmin.centerId}`, {
// //         //   headers: { Authorization: `Bearer ${yourAuthToken}` },
// //         // });
// //         // const data = await response.json();
// //         // const myCentreRequests = data.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);

// //         // For now, simulate async fetch with dummy data
// //         await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
// //         const myCentreRequests = dummyData.filter(req => req.scrapCentre === loggedInAdmin.scrapCentre);
        
// //         setRequests(myCentreRequests);
// //         setFilteredRequests(myCentreRequests);
// //       } catch (err) {
// //         console.error('Failed to fetch requests:', err);
// //         Alert.alert("Error", "Failed to load requests.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRequests();
// //   }, []); // Depend on loggedInAdmin.centerId if it changes

// //   useEffect(() => {
// //     filterAndSearch();
// //   }, [search, filterType, filterReqId, requests]); // Add requests to dependency array

// //   const filterAndSearch = () => {
// //     let result = [...requests];

// //     if (filterReqId) {
// //       result = result.filter(req => req.id.toLowerCase().includes(filterReqId.toLowerCase()));
// //     }

// //     if (filterType) {
// //       result = result.filter(req => req.scrapType.toLowerCase() === filterType.toLowerCase());
// //     }

// //     if (search) {
// //       result = result.filter(req =>
// //         Object.values(req).some(value =>
// //           String(value).toLowerCase().includes(search.toLowerCase())
// //         )
// //       );
// //     }
// //     setFilteredRequests(result);
// //   };

// //   const toggleSort = () => {
// //     const sorted = [...filteredRequests].sort((a, b) => {
// //       const dateA = new Date(a.pickupDate);
// //       const dateB = new Date(b.pickupDate);
// //       return sortAsc ? dateA - dateB : dateB - dateA;
// //     });

// //     setFilteredRequests(sorted);
// //     setSortAsc(!sortAsc);
// //   };

// //   const navigateToDetails = (requestId) => {
// //     // Pass the request ID to the new screen
// //     navigation.navigate('RequestDetails', { requestId: requestId, allRequests: requests });
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color={Colors.primary} />
// //         <Text style={styles.loadingText}>Loading requests...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {/* Top Bar / Dashboard Header */}
// //       <View style={styles.dashboardHeader}>
// //         <Text style={styles.dashboardTitle}>
// //           <FontAwesome name="clipboard-list" size={28} color={Colors.white} /> Requests Dashboard
// //         </Text>
// //         <Text style={styles.centerName}>{loggedInAdmin.scrapCentre}</Text>
// //       </View>

// //       <View style={styles.contentArea}>
// //         <Text style={styles.sectionHeader}>Pickup Requests Summary</Text>

// //         <View style={styles.controls}>
// //           {/* Search Input */}
// //           <View style={styles.inputGroup}>
// //             <TextInput
// //               style={styles.searchInput}
// //               placeholder="Search all fields..."
// //               placeholderTextColor={Colors.mediumGray}
// //               value={search}
// //               onChangeText={setSearch}
// //             />
// //             <FontAwesome name="search" size={16} color={Colors.darkGray} style={styles.searchIcon} />
// //           </View>

// //           {/* Filter Inputs */}
// //           <View style={styles.filterGroup}>
// //             <TextInput
// //               style={styles.filterInput}
// //               placeholder="Filter by Req ID"
// //               placeholderTextColor={Colors.mediumGray}
// //               value={filterReqId}
// //               onChangeText={setFilterReqId}
// //             />
// //             <View style={styles.pickerContainer}>
// //                 <Picker
// //                     selectedValue={filterType}
// //                     style={styles.picker}
// //                     onValueChange={(itemValue) => setFilterType(itemValue)}
// //                     itemStyle={styles.pickerItem}
// //                     dropdownIconColor={Colors.darkGray}
// //                 >
// //                     <Picker.Item label="All Scrap Types" value="" color={Colors.mediumGray} />
// //                     <Picker.Item label="Metal" value="Metal" color={Colors.darkGray} />
// //                     <Picker.Item label="Plastic" value="Plastic" color={Colors.darkGray} />
// //                     <Picker.Item label="Paper" value="Paper" color={Colors.darkGray} />
// //                     <Picker.Item label="E-waste" value="E-waste" color={Colors.darkGray} />
// //                 </Picker>
// //                 <AntDesign name="down" size={14} color={Colors.darkGray} style={styles.pickerIcon} />
// //             </View>
// //           </View>

// //           {/* Sort Button */}
// //           <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
// //             <FontAwesome name="sort" size={18} color={Colors.white} />
// //             <Text style={styles.sortText}>Sort by Pickup Date {sortAsc ? '(Asc)' : '(Desc)'}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Table/List View */}
// //         {filteredRequests.length === 0 ? (
// //           <View style={styles.emptyState}>
// //             <AntDesign name="inbox" size={50} color={Colors.mediumGray} />
// //             <Text style={styles.emptyStateText}>No requests found for {loggedInAdmin.scrapCentre}.</Text>
// //             {search || filterType || filterReqId ? 
// //                 <Text style={styles.emptyStateText}>Try adjusting your search or filters.</Text> :
// //                 <Text style={styles.emptyStateText}>Homeowners will post new requests here.</Text>
// //             }
// //           </View>
// //         ) : (
// //           <ScrollView horizontal style={styles.tableScrollHorizontal}>
// //             <View>
// //               {/* Table Header */}
// //               <View style={styles.tableHeader}>
// //                 <Text style={[styles.cell, { width: 120 }]}>Req ID</Text>
// //                 <Text style={[styles.cell, { width: 150 }]}>Scrap Type</Text>
// //                 <Text style={[styles.cell, { width: 100 }]}>Status</Text> {/* Added status to summary */}
// //                 <Text style={[styles.cell, { width: 120 }]}>Action</Text>
// //               </View>

// //               {/* Table Rows */}
// //               <ScrollView style={styles.tableScrollVertical}>
// //                 {filteredRequests.map((req) => (
// //                   <View key={req.id} style={[styles.row, req.status === 'approved' ? styles.approvedRow : req.status === 'rejected' ? styles.rejectedRow : styles.pendingRow]}>
// //                     <Text style={[styles.cell, { width: 120 }]}>{req.id}</Text>
// //                     <Text style={[styles.cell, { width: 150 }]}>{req.scrapType}</Text>
// //                     <Text style={[styles.cell, { width: 100 }, req.status === 'approved' ? {color: Colors.green} : req.status === 'rejected' ? {color: Colors.red} : {color: Colors.blue}]}>
// //                         {req.status ? req.status.toUpperCase() : 'PENDING'}
// //                     </Text>
// //                     <View style={[styles.actionCell, { width: 120 }]}>
// //                       <TouchableOpacity
// //                         style={styles.readMoreBtn}
// //                         onPress={() => navigateToDetails(req.id)}
// //                       >
// //                         <Text style={styles.btnText}>Read More</Text>
// //                         <AntDesign name="right" size={12} color={Colors.white} style={{marginLeft: 5}} />
// //                       </TouchableOpacity>
// //                     </View>
// //                   </View>
// //                 ))}
// //               </ScrollView>
// //             </View>
// //           </ScrollView>
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: Colors.lightGray,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: Colors.lightGray,
// //   },
// //   loadingText: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     color: Colors.darkGray,
// //   },
// //   dashboardHeader: {
// //     backgroundColor: Colors.primary,
// //     padding: 20,
// //     paddingTop: Platform.OS === 'web' ? 20 : 40,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 2,
// //   },
// //   dashboardTitle: {
// //     fontSize: 26,
// //     color: Colors.white,
// //     fontWeight: 'bold',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 10,
// //   },
// //   centerName: {
// //     fontSize: 18,
// //     color: Colors.white,
// //     fontStyle: 'italic',
// //   },
// //   contentArea: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   sectionHeader: {
// //     fontSize: 22,
// //     color: Colors.primary,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// //     borderBottomWidth: 2,
// //     borderBottomColor: Colors.secondary,
// //     paddingBottom: 5,
// //   },
// //   controls: {
// //     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
// //     flexWrap: 'wrap',
// //     marginBottom: 20,
// //     gap: 10,
// //     backgroundColor: Colors.white,
// //     padding: 15,
// //     borderRadius: 8,
// //     elevation: 2,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 1,
// //   },
// //   inputGroup: {
// //     flex: Platform.OS === 'web' ? 1 : undefined,
// //     position: 'relative',
// //     minWidth: Platform.OS === 'web' ? 250 : '100%',
// //   },
// //   searchInput: {
// //     flex: 1,
// //     borderColor: Colors.mediumGray,
// //     borderWidth: 1,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     borderRadius: 5,
// //     fontSize: 16,
// //     paddingRight: 40,
// //     color: Colors.darkGray,
// //   },
// //   searchIcon: {
// //     position: 'absolute',
// //     right: 15,
// //     top: 12,
// //   },
// //   filterGroup: {
// //     flexDirection: Platform.OS === 'web' ? 'row' : 'column',
// //     gap: 10,
// //     flex: Platform.OS === 'web' ? 2 : undefined,
// //     minWidth: Platform.OS === 'web' ? 400 : '100%',
// //   },
// //   filterInput: {
// //     flex: 1,
// //     borderColor: Colors.mediumGray,
// //     borderWidth: 1,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     borderRadius: 5,
// //     fontSize: 16,
// //     color: Colors.darkGray,
// //     minWidth: Platform.OS === 'web' ? 180 : '100%',
// //   },
// //   pickerContainer: {
// //     flex: 1,
// //     borderColor: Colors.mediumGray,
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     overflow: 'hidden',
// //     minWidth: Platform.OS === 'web' ? 180 : '100%',
// //     justifyContent: 'center',
// //     position: 'relative',
// //   },
// //   picker: {
// //     height: Platform.OS === 'ios' ? 120 : 45,
// //     width: '100%',
// //     color: Colors.darkGray,
// //   },
// //   pickerItem: {
// //     color: Colors.darkGray,
// //   },
// //   pickerIcon: {
// //     position: 'absolute',
// //     right: 15,
// //     top: '50%',
// //     marginTop: -7,
// //     pointerEvents: 'none',
// //   },
// //   sortBtn: {
// //     flexDirection: 'row',
// //     backgroundColor: Colors.primary,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     minWidth: Platform.OS === 'web' ? 150 : '100%',
// //     elevation: 2,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 1,
// //   },
// //   sortText: {
// //     color: Colors.white,
// //     marginLeft: 8,
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// //   tableScrollHorizontal: {
// //     // Web-specific: remove default scrollbar behavior if desired
// //   },
// //   tableHeader: {
// //     flexDirection: 'row',
// //     backgroundColor: Colors.primary,
// //     paddingVertical: 10,
// //     paddingHorizontal: 8,
// //     borderTopLeftRadius: 8,
// //     borderTopRightRadius: 8,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     paddingVertical: 8,
// //     paddingHorizontal: 8,
// //     borderBottomWidth: 1,
// //     borderBottomColor: Colors.lightGray,
// //     alignItems: 'center',
// //   },
// //   pendingRow: {
// //     backgroundColor: Colors.white, // Default for pending
// //   },
// //   approvedRow: {
// //     backgroundColor: Colors.green + '20', // Light green tint
// //   },
// //   rejectedRow: {
// //     backgroundColor: Colors.red + '20', // Light red tint
// //   },
// //   cell: {
// //     paddingHorizontal: 4,
// //     color: Colors.darkGray,
// //     fontSize: 14,
// //     minHeight: 50, // Adjusted minHeight for compact rows
// //     justifyContent: 'center',
// //     alignItems: 'flex-start',
// //   },
// //   actionCell: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center', // Center the button in the cell
// //     gap: 8,
// //   },
// //   readMoreBtn: {
// //     flexDirection: 'row',
// //     backgroundColor: Colors.blue, // Blue for action/info
// //     paddingVertical: 6,
// //     paddingHorizontal: 10,
// //     borderRadius: 4,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     elevation: 1,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 1,
// //   },
// //   btnText: {
// //     color: Colors.white,
// //     fontSize: 13,
// //     fontWeight: '500',
// //   },
// //   emptyState: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor: Colors.white,
// //     borderRadius: 8,
// //     elevation: 2,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 1,
// //   },
// //   emptyStateText: {
// //     fontSize: 16,
// //     color: Colors.darkGray,
// //     marginTop: 10,
// //     textAlign: 'center',
// //   },
// //   tableScrollVertical: {
// //     maxHeight: 400, // Limit vertical scroll height
// //   }
// // });


// //testing
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { FontAwesome, AntDesign } from '@expo/vector-icons';
// import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
// import axios from 'axios'; // Import axios
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// // Define a consistent color palette
// const Colors = {
//     primary: '#004225', // Dark Green
//     secondary: '#3CB371', // Medium Green
//     accent: '#FFD700', // Gold/Yellow for highlights
//     white: '#FFFFFF',
//     lightGray: '#F0F0F0',
//     mediumGray: '#B0B0B0', // Slightly darker gray for better contrast
//     darkGray: '#333333',
//     red: '#DC3545', // Danger
//     green: '#28A745', // Success
//     blue: '#007BFF', // Info
//     deepBlue: '#0056b3', // Darker blue for active states
//     warmRed: '#C82333', // Slightly deeper red for active states
//     vibrantGreen: '#218838', // Slightly deeper green for active states
// };

// // Backend URL - Make sure this matches your actual backend server IP and port
// const BACKEND_URL = "http://192.168.1.5:5000"; 

// export default function Trequests({ navigation }) {
//     const [requests, setRequests] = useState([]);
//     const [filteredRequests, setFilteredRequests] = useState([]);
//     const [search, setSearch] = useState('');
//     const [sortAsc, setSortAsc] = useState(true);
//     const [filterType, setFilterType] = useState('');
//     const [filterReqId, setFilterReqId] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [adminCenterName, setAdminCenterName] = useState('Your Center'); // To display in header
//     const [adminCenterId, setAdminCenterId] = useState(null); // The actual ID for backend calls

//     // Function to fetch admin details and requests
//     const fetchAdminAndRequests = useCallback(async () => {
//         setLoading(true);
//         try {
//             const storedToken = await AsyncStorage.getItem("adminToken");
//             const storedCenterId = await AsyncStorage.getItem("centerId");
//             const storedCenterName = await AsyncStorage.getItem("centerName");

//             if (!storedCenterId || !storedToken) {
//                 Alert.alert("Authentication Required", "Admin not logged in or center ID missing.");
//                 setLoading(false);
//                 // Consider navigating to admin login here
//                 return;
//             }

//             setAdminCenterId(storedCenterId);
//             setAdminCenterName(storedCenterName || 'Your Center');

//             const response = await axios.get(`${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list/`, {
//                 headers: {
//                     Authorization: `Bearer ${storedToken}`
//                 }
//             });

//             const fetchedRequests = response.data.requests.map(req => ({
//                 id: req._id,
//                 name: req.fullName,
//                 phone: req.phoneNumber,
//                 location: req.location,
//                 pickupDate: req.pickupDate,
//                 pickupTime: req.pickupTime,
//                 scrapType: req.scrapType,
//                 weight: `${req.weight}kg`,
//                 image: req.imageUrl,
//                 status: req.status,
//                 // Ensure collectionCenter is populated in backend to get centerName
//                 scrapCentre: req.collectionCenter?.centerName || 'N/A', 
//                 description: req.description,
//             }));
            
//             setRequests(fetchedRequests);
//             setFilteredRequests(fetchedRequests);
//         } catch (err) {
//             console.error('Failed to fetch requests for admin center:', err.response?.data || err.message);
//             Alert.alert("Error", err.response?.data?.message || "Failed to load requests for your center.");
//             setRequests([]);
//             setFilteredRequests([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); // Dependencies for useCallback. Empty means it's memoized until component unmounts.

//     // Use useFocusEffect to refetch data whenever the screen comes into focus
//     useFocusEffect(
//         useCallback(() => {
//             fetchAdminAndRequests();
//             return () => {
//                 // Cleanup function if needed when screen loses focus
//             };
//         }, [fetchAdminAndRequests])
//     );

//     // Apply filters and search whenever dependencies change
//     useEffect(() => {
//         filterAndSearch();
//     }, [search, filterType, filterReqId, requests]);

//     const filterAndSearch = () => {
//         let result = [...requests];

//         if (filterReqId) {
//             result = result.filter(req => String(req.id).toLowerCase().includes(filterReqId.toLowerCase()));
//         }

//         if (filterType) {
//             // Case-insensitive comparison for scrapType filter
//             result = result.filter(req => String(req.scrapType).toLowerCase() === filterType.toLowerCase());
//         }

//         if (search) {
//             result = result.filter(req =>
//                 Object.values(req).some(value =>
//                     String(value).toLowerCase().includes(search.toLowerCase())
//                 )
//             );
//         }
//         setFilteredRequests(result);
//     };

//     const toggleSort = () => {
//         const sorted = [...filteredRequests].sort((a, b) => {
//             const dateA = new Date(a.pickupDate);
//             const dateB = new Date(b.pickupDate);
//             return sortAsc ? dateA - dateB : dateB - dateA;
//         });

//         setFilteredRequests(sorted);
//         setSortAsc(!sortAsc);
//     };

//     const navigateToDetails = (requestId) => {
//         const requestToPass = requests.find(req => req.id === requestId);
//         if (requestToPass) {
//             navigation.navigate('RequestDetails', { requestData: requestToPass });
//         } else {
//             Alert.alert("Error", "Could not find details for this request.");
//         }
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={Colors.primary} />
//                 <Text style={styles.loadingText}>Loading requests...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {/* Top Bar / Dashboard Header */}
//             <View style={styles.dashboardHeader}>
//                 <Text style={styles.dashboardTitle}>
//                     <FontAwesome name="clipboard-list" size={28} color={Colors.white} /> Requests Dashboard
//                 </Text>
//                 <Text style={styles.centerName}>{adminCenterName}</Text>
//             </View>

//             <View style={styles.contentArea}>
//                 <Text style={styles.sectionHeader}>Pickup Requests Summary</Text>

//                 <View style={styles.controls}>
//                     {/* Search Input */}
//                     <View style={styles.inputGroup}>
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search all fields..."
//                             placeholderTextColor={Colors.mediumGray}
//                             value={search}
//                             onChangeText={setSearch}
//                         />
//                         <FontAwesome name="search" size={16} color={Colors.darkGray} style={styles.searchIcon} />
//                     </View>

//                     {/* Filter Inputs */}
//                     <View style={styles.filterGroup}>
//                         <TextInput
//                             style={styles.filterInput}
//                             placeholder="Filter by Req ID"
//                             placeholderTextColor={Colors.mediumGray}
//                             value={filterReqId}
//                             onChangeText={setFilterReqId}
//                         />
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={filterType}
//                                 style={styles.picker}
//                                 onValueChange={(itemValue) => setFilterType(itemValue)}
//                                 itemStyle={styles.pickerItem}
//                                 dropdownIconColor={Colors.darkGray}
//                             >
//                                 <Picker.Item label="All Scrap Types" value="" color={Colors.mediumGray} />
//                                 <Picker.Item label="Metal" value="metal" color={Colors.darkGray} />
//                                 <Picker.Item label="Plastic" value="plastic" color={Colors.darkGray} />
//                                 <Picker.Item label="Electronics" value="electronics" color={Colors.darkGray} />
//                                 <Picker.Item label="Paper/Cardboard" value="paper_cardboard" color={Colors.darkGray} />
//                                 <Picker.Item label="Glass" value="glass" color={Colors.darkGray} />
//                                 <Picker.Item label="Textiles" value="textiles" color={Colors.darkGray} />
//                                 <Picker.Item label="Others" value="others" color={Colors.darkGray} />
//                             </Picker>
//                             <AntDesign name="down" size={14} color={Colors.darkGray} style={styles.pickerIcon} />
//                         </View>
//                     </View>

//                     {/* Sort Button */}
//                     <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
//                         <FontAwesome name="sort" size={18} color={Colors.white} />
//                         <Text style={styles.sortText}>Sort by Pickup Date {sortAsc ? '(Asc)' : '(Desc)'}</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Table/List View */}
//                 {filteredRequests.length === 0 ? (
//                     <View style={styles.emptyState}>
//                         <AntDesign name="inbox" size={50} color={Colors.mediumGray} />
//                         <Text style={styles.emptyStateText}>No requests found for {adminCenterName}.</Text>
//                         {search || filterType || filterReqId ? 
//                             <Text style={styles.emptyStateText}>Try adjusting your search or filters.</Text> :
//                             <Text style={styles.emptyStateText}>Homeowners will post new requests here.</Text>
//                         }
//                     </View>
//                 ) : (
//                     <ScrollView horizontal style={styles.tableScrollHorizontal}>
//                         <View>
//                             {/* Table Header */}
//                             <View style={styles.tableHeader}>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Req ID</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Scrap Type</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>Status</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Action</Text>
//                             </View>

//                             {/* Table Rows */}
//                             <ScrollView style={styles.tableScrollVertical}>
//                                 {filteredRequests.map((req) => (
//                                     <TouchableOpacity 
//                                         key={req.id} 
//                                         style={[styles.row, 
//                                             req.status === 'approved' ? styles.approvedRow : 
//                                             req.status === 'rejected' ? styles.rejectedRow : 
//                                             req.status === 'collected' ? styles.collectedRow : 
//                                             styles.pendingRow
//                                         ]}
//                                         onPress={() => navigateToDetails(req.id)} // Make row tappable
//                                         activeOpacity={0.7}
//                                     >
//                                         <Text style={[styles.cell, { width: 120 }]}>{req.id}</Text>
//                                         <Text style={[styles.cell, { width: 150 }]}>{req.scrapType}</Text>
//                                         <Text style={[styles.cell, { width: 100 }, 
//                                             req.status === 'approved' ? {color: Colors.green} : 
//                                             req.status === 'rejected' ? {color: Colors.red} : 
//                                             req.status === 'collected' ? {color: Colors.primary} : // Collected status text color
//                                             {color: Colors.blue} // Pending status text color
//                                         ]}>
//                                             {req.status ? req.status.toUpperCase() : 'PENDING'}
//                                         </Text>
//                                         <View style={[styles.actionCell, { width: 120 }]}>
//                                             <TouchableOpacity
//                                                 style={styles.readMoreBtn}
//                                                 onPress={() => navigateToDetails(req.id)}
//                                             >
//                                                 <Text style={[styles.btnText, {marginLeft: 0}]}>View</Text> {/* Removed marginLeft for "View" */}
//                                                 <AntDesign name="right" size={12} color={Colors.white} style={{marginLeft: 5}} />
//                                             </TouchableOpacity>
//                                         </View>
//                                     </TouchableOpacity>
//                                 ))}
//                             </ScrollView>
//                         </View>
//                     </ScrollView>
//                 )}
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.lightGray,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.lightGray,
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: Colors.darkGray,
//     },
//     dashboardHeader: {
//         backgroundColor: Colors.primary,
//         padding: 20,
//         paddingTop: Platform.OS === 'web' ? 20 : 40,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//     },
//     dashboardTitle: {
//         fontSize: 26,
//         color: Colors.white,
//         fontWeight: 'bold',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//     },
//     centerName: {
//         fontSize: 18,
//         color: Colors.white,
//         fontStyle: 'italic',
//     },
//     contentArea: {
//         flex: 1,
//         padding: 20,
//     },
//     sectionHeader: {
//         fontSize: 22,
//         color: Colors.primary,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         borderBottomWidth: 2,
//         borderBottomColor: Colors.secondary,
//         paddingBottom: 5,
//     },
//     controls: {
//         flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//         flexWrap: 'wrap',
//         marginBottom: 20,
//         gap: 10,
//         backgroundColor: Colors.white,
//         padding: 15,
//         borderRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     inputGroup: {
//         flex: Platform.OS === 'web' ? 1 : undefined,
//         position: 'relative',
//         minWidth: Platform.OS === 'web' ? 250 : '100%',
//     },
//     searchInput: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         fontSize: 16,
//         paddingRight: 40,
//         color: Colors.darkGray,
//         backgroundColor: Colors.white,
//     },
//     searchIcon: {
//         position: 'absolute',
//         right: 15,
//         top: 12,
//     },
//     filterGroup: {
//         flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//         gap: 10,
//         flex: Platform.OS === 'web' ? 2 : undefined,
//         minWidth: Platform.OS === 'web' ? 400 : '100%',
//     },
//     filterInput: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         fontSize: 16,
//         color: Colors.darkGray,
//         backgroundColor: Colors.white,
//         minWidth: Platform.OS === 'web' ? 180 : '100%',
//     },
//     pickerContainer: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         borderRadius: 5,
//         overflow: 'hidden',
//         minWidth: Platform.OS === 'web' ? 180 : '100%',
//         justifyContent: 'center',
//         position: 'relative',
//         backgroundColor: Colors.white,
//     },
//     picker: {
//         height: Platform.OS === 'ios' ? 120 : 45,
//         width: '100%',
//         color: Colors.darkGray,
//     },
//     pickerItem: {
//         color: Colors.darkGray,
//     },
//     pickerIcon: {
//         position: 'absolute',
//         right: 15,
//         top: '50%',
//         marginTop: -7,
//         pointerEvents: 'none',
//     },
//     sortBtn: {
//         flexDirection: 'row',
//         backgroundColor: Colors.primary,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         minWidth: Platform.OS === 'web' ? 150 : '100%',
//         elevation: 3, // Slightly higher elevation
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//     },
//     sortText: {
//         color: Colors.white,
//         marginLeft: 8,
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     tableScrollHorizontal: {
//         // No specific styles needed unless you want to hide scrollbars globally or customize
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         backgroundColor: Colors.primary,
//         paddingVertical: 12, // Increased padding
//         paddingHorizontal: 8,
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     headerCell: {
//         color: Colors.white, // Header text color
//         fontWeight: 'bold',
//         fontSize: 15, // Slightly larger font
//         justifyContent: 'center',
//         alignItems: 'center', // Center text in header cells
//     },
//     row: {
//         flexDirection: 'row',
//         paddingVertical: 10, // Increased padding
//         paddingHorizontal: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: Colors.mediumGray + '50', // Lighter border
//         alignItems: 'center',
//         borderRadius: 5, // Slight rounding for rows
//         marginBottom: 2, // Small gap between rows
//         elevation: 1, // Subtle lift for each row
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0.5 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//     },
//     pendingRow: {
//         backgroundColor: Colors.white,
//     },
//     approvedRow: {
//         backgroundColor: Colors.green + '15', // Lighter tint
//     },
//     rejectedRow: {
//         backgroundColor: Colors.red + '15', // Lighter tint
//     },
//     collectedRow: {
//         backgroundColor: Colors.accent + '15', // Lighter tint
//     },
//     cell: {
//         paddingHorizontal: 4,
//         color: Colors.darkGray,
//         fontSize: 14,
//         minHeight: 40, // Adjusted minHeight
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//     },
//     actionCell: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 8,
//     },
//     readMoreBtn: {
//         flexDirection: 'row',
//         backgroundColor: Colors.blue,
//         paddingVertical: 8, // Increased padding
//         paddingHorizontal: 12, // Increased padding
//         borderRadius: 6, // More rounded
//         alignItems: 'center',
//         justifyContent: 'center',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//     },
//     btnText: {
//         color: Colors.white,
//         fontSize: 14, // Slightly larger font
//         fontWeight: '600',
//         marginLeft: 8, // Adjusted for consistency
//     },
//     emptyState: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: Colors.white,
//         borderRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//         minHeight: 200, // Ensure it has some height
//     },
//     emptyStateText: {
//         fontSize: 16,
//         color: Colors.darkGray,
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     tableScrollVertical: {
//         maxHeight: 400, // Limit vertical scroll height
//     }
// });


//test 2
// import React, { useState, useEffect, useCallback } from 'react'; // <--- FIX: Added useCallback here
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { FontAwesome, AntDesign } from '@expo/vector-icons';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define a consistent color palette
// const Colors = {
//     primary: '#004225', // Dark Green
//     secondary: '#3CB371', // Medium Green
//     accent: '#FFD700', // Gold/Yellow for highlights
//     white: '#FFFFFF',
//     lightGray: '#F0F0F0',
//     mediumGray: '#B0B0B0', // Slightly darker gray for better contrast
//     darkGray: '#333333',
//     red: '#DC3545', // Danger
//     green: '#28A745', // Success
//     blue: '#007BFF', // Info
//     deepBlue: '#0056b3', // Darker blue for active states
//     warmRed: '#C82333', // Slightly deeper red for active states
//     vibrantGreen: '#218838', // Slightly deeper green for active states
// };

// // Backend URL - Make sure this matches your actual backend server IP and port
// const BACKEND_URL = "http://192.168.1.5:5000"; 

// export default function Trequests({ navigation }) {
//     const [requests, setRequests] = useState([]);
//     const [filteredRequests, setFilteredRequests] = useState([]);
//     const [search, setSearch] = useState('');
//     const [sortAsc, setSortAsc] = useState(true);
//     const [filterType, setFilterType] = useState('');
//     const [filterReqId, setFilterReqId] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [adminCenterName, setAdminCenterName] = useState('Your Center'); // To display in header
//     const [adminCenterId, setAdminCenterId] = useState(null); // The actual ID for backend calls

//     // Function to fetch admin details and requests
//     const fetchAdminAndRequests = useCallback(async () => {
//         setLoading(true);
//         try {
//             // 1. Get Admin Center ID and Token from AsyncStorage (or wherever you store them)
//             const storedToken = await AsyncStorage.getItem("adminToken"); // Assuming you store admin token
//             const storedCenterId = await AsyncStorage.getItem("centerId"); // Assuming you store centerId
//             const storedCenterName = await AsyncStorage.getItem("centerName"); // Assuming you store centerName

//             if (!storedCenterId || !storedToken) {
//                 Alert.alert("Authentication Required", "Admin not logged in or center ID missing.");
//                 setLoading(false);
//                 // Consider navigating to admin login here
//                 // navigation.navigate('ALogin');
//                 return;
//             }

//             setAdminCenterId(storedCenterId);
//             setAdminCenterName(storedCenterName || 'Your Center'); // Use stored name or default

//             // 2. Fetch requests from the backend
//             // This uses the route: router.get('/requests/center/:centerId/list/',getAllCenterRequests);
//             const response = await axios.get(`${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list/`, {
//                 headers: {
//                     Authorization: `Bearer ${storedToken}` // Include admin's authentication token
//                 }
//             });

//             // Assuming your backend responds with { requests: [...], totalRequests: N }
//             const fetchedRequests = response.data.requests.map(req => ({
//                 // Map backend data fields to frontend expected fields
//                 id: req._id, // Use _id as unique identifier
//                 name: req.fullName,
//                 phone: req.phoneNumber,
//                 location: req.location,
//                 pickupDate: req.pickupDate,
//                 pickupTime: req.pickupTime, // Include pickupTime
//                 scrapType: req.scrapType,
//                 weight: `${req.weight}kg`, // Convert to string with 'kg'
//                 image: req.imageUrl, // This should be a public URL
//                 status: req.status,
//                 // Ensure collectionCenter is populated in backend to get centerName
//                 scrapCentre: req.collectionCenter?.centerName || 'N/A', 
//                 description: req.description,
//             }));
            
//             setRequests(fetchedRequests);
//             setFilteredRequests(fetchedRequests); // Initialize filtered requests
//         } catch (err) {
//             console.error('Failed to fetch requests for admin center:', err.response?.data || err.message);
//             Alert.alert("Error", err.response?.data?.message || "Failed to load requests for your center.");
//             setRequests([]); // Clear requests on error
//             setFilteredRequests([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); // Dependencies for useCallback. Empty means it's memoized until component unmounts.

//     // Use useFocusEffect to refetch data whenever the screen comes into focus
//     useFocusEffect(
//         useCallback(() => {
//             fetchAdminAndRequests();
//             return () => {
//                 // Cleanup function if needed when screen loses focus
//             };
//         }, [fetchAdminAndRequests])
//     );

//     // Apply filters and search whenever dependencies change
//     useEffect(() => {
//         filterAndSearch();
//     }, [search, filterType, filterReqId, requests]);

//     const filterAndSearch = () => {
//         let result = [...requests]; // Start with all fetched requests

//         if (filterReqId) {
//             result = result.filter(req => String(req.id).toLowerCase().includes(filterReqId.toLowerCase()));
//         }

//         if (filterType) {
//             // Case-insensitive comparison for scrapType filter
//             result = result.filter(req => String(req.scrapType).toLowerCase() === filterType.toLowerCase());
//         }

//         if (search) {
//             result = result.filter(req =>
//                 Object.values(req).some(value =>
//                     String(value).toLowerCase().includes(search.toLowerCase())
//                 )
//             );
//         }
//         setFilteredRequests(result);
//     };

//     const toggleSort = () => {
//         const sorted = [...filteredRequests].sort((a, b) => {
//             const dateA = new Date(a.pickupDate);
//             const dateB = new Date(b.pickupDate);
//             return sortAsc ? dateA - dateB : dateB - dateA;
//         });

//         setFilteredRequests(sorted);
//         setSortAsc(!sortAsc);
//     };

//     const navigateToDetails = (requestId) => {
//         const requestToPass = requests.find(req => req.id === requestId);
//         if (requestToPass) {
//             navigation.navigate('RequestDetails', { requestData: requestToPass });
//         } else {
//             Alert.alert("Error", "Could not find details for this request.");
//         }
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={Colors.primary} />
//                 <Text style={styles.loadingText}>Loading requests...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {/* Top Bar / Dashboard Header */}
//             <View style={styles.dashboardHeader}>
//                 <Text style={styles.dashboardTitle}>
//                     <FontAwesome name="clipboard-list" size={28} color={Colors.white} /> Requests Dashboard
//                 </Text>
//                 <Text style={styles.centerName}>{adminCenterName}</Text>
//             </View>

//             <View style={styles.contentArea}>
//                 <Text style={styles.sectionHeader}>Pickup Requests Summary</Text>

//                 <View style={styles.controls}>
//                     {/* Search Input */}
//                     <View style={styles.inputGroup}>
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search all fields..."
//                             placeholderTextColor={Colors.mediumGray}
//                             value={search}
//                             onChangeText={setSearch}
//                         />
//                         <FontAwesome name="search" size={16} color={Colors.darkGray} style={styles.searchIcon} />
//                     </View>

//                     {/* Filter Inputs */}
//                     <View style={styles.filterGroup}>
//                         <TextInput
//                             style={styles.filterInput}
//                             placeholder="Filter by Req ID"
//                             placeholderTextColor={Colors.mediumGray}
//                             value={filterReqId}
//                             onChangeText={setFilterReqId}
//                         />
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={filterType}
//                                 style={styles.picker}
//                                 onValueChange={(itemValue) => setFilterType(itemValue)}
//                                 itemStyle={styles.pickerItem}
//                                 dropdownIconColor={Colors.darkGray}
//                             >
//                                 <Picker.Item label="All Scrap Types" value="" color={Colors.mediumGray} />
//                                 <Picker.Item label="Metal" value="metal" color={Colors.darkGray} />
//                                 <Picker.Item label="Plastic" value="plastic" color={Colors.darkGray} />
//                                 <Picker.Item label="Electronics" value="electronics" color={Colors.darkGray} />
//                                 <Picker.Item label="Paper/Cardboard" value="paper_cardboard" color={Colors.darkGray} />
//                                 <Picker.Item label="Glass" value="glass" color={Colors.darkGray} />
//                                 <Picker.Item label="Textiles" value="textiles" color={Colors.darkGray} />
//                                 <Picker.Item label="Others" value="others" color={Colors.darkGray} />
//                             </Picker>
//                             <AntDesign name="down" size={14} color={Colors.darkGray} style={styles.pickerIcon} />
//                         </View>
//                     </View>

//                     {/* Sort Button */}
//                     <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
//                         <FontAwesome name="sort" size={18} color={Colors.white} />
//                         <Text style={styles.sortText}>Sort by Pickup Date {sortAsc ? '(Asc)' : '(Desc)'}</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Table/List View */}
//                 {filteredRequests.length === 0 ? (
//                     <View style={styles.emptyState}>
//                         <AntDesign name="inbox" size={50} color={Colors.mediumGray} />
//                         <Text style={styles.emptyStateText}>No requests found for {adminCenterName}.</Text>
//                         {search || filterType || filterReqId ? 
//                             <Text style={styles.emptyStateText}>Try adjusting your search or filters.</Text> :
//                             <Text style={styles.emptyStateText}>Homeowners will post new requests here.</Text>
//                         }
//                     </View>
//                 ) : (
//                     <ScrollView horizontal style={styles.tableScrollHorizontal}>
//                         <View>
//                             {/* Table Header */}
//                             <View style={styles.tableHeader}>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Req ID</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Scrap Type</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>Status</Text>
//                                 <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Action</Text>
//                             </View>

//                             {/* Table Rows */}
//                             <ScrollView style={styles.tableScrollVertical}>
//                                 {filteredRequests.map((req) => (
//                                     <TouchableOpacity 
//                                         key={req.id} 
//                                         style={[styles.row, 
//                                             req.status === 'approved' ? styles.approvedRow : 
//                                             req.status === 'rejected' ? styles.rejectedRow : 
//                                             req.status === 'collected' ? styles.collectedRow : 
//                                             styles.pendingRow
//                                         ]}
//                                         onPress={() => navigateToDetails(req.id)} // Make row tappable
//                                         activeOpacity={0.7}
//                                     >
//                                         <Text style={[styles.cell, { width: 120 }]}>{req.id}</Text>
//                                         <Text style={[styles.cell, { width: 150 }]}>{req.scrapType}</Text>
//                                         <Text style={[styles.cell, { width: 100 }, 
//                                             req.status === 'approved' ? {color: Colors.green} : 
//                                             req.status === 'rejected' ? {color: Colors.red} : 
//                                             req.status === 'collected' ? {color: Colors.primary} : 
//                                             {color: Colors.blue} 
//                                         ]}>
//                                             {req.status ? req.status.toUpperCase() : 'PENDING'}
//                                         </Text>
//                                         <View style={[styles.actionCell, { width: 120 }]}>
//                                             <TouchableOpacity
//                                                 style={styles.readMoreBtn}
//                                                 onPress={() => navigateToDetails(req.id)}
//                                             >
//                                                 <Text style={[styles.btnText, {marginLeft: 0}]}>View</Text>
//                                                 <AntDesign name="right" size={12} color={Colors.white} style={{marginLeft: 5}} />
//                                             </TouchableOpacity>
//                                         </View>
//                                     </TouchableOpacity>
//                                 ))}
//                             </ScrollView>
//                         </View>
//                     </ScrollView>
//                 )}
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.lightGray,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.lightGray,
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: Colors.darkGray,
//     },
//     dashboardHeader: {
//         backgroundColor: Colors.primary,
//         padding: 20,
//         paddingTop: Platform.OS === 'web' ? 20 : 40,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//     },
//     dashboardTitle: {
//         fontSize: 26,
//         color: Colors.white,
//         fontWeight: 'bold',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//     },
//     centerName: {
//         fontSize: 18,
//         color: Colors.white,
//         fontStyle: 'italic',
//     },
//     contentArea: {
//         flex: 1,
//         padding: 20,
//     },
//     sectionHeader: {
//         fontSize: 22,
//         color: Colors.primary,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         borderBottomWidth: 2,
//         borderBottomColor: Colors.secondary,
//         paddingBottom: 5,
//     },
//     controls: {
//         flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//         flexWrap: 'wrap',
//         marginBottom: 20,
//         gap: 10,
//         backgroundColor: Colors.white,
//         padding: 15,
//         borderRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     inputGroup: {
//         flex: Platform.OS === 'web' ? 1 : undefined,
//         position: 'relative',
//         minWidth: Platform.OS === 'web' ? 250 : '100%',
//     },
//     searchInput: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         fontSize: 16,
//         paddingRight: 40,
//         color: Colors.darkGray,
//         backgroundColor: Colors.white,
//     },
//     searchIcon: {
//         position: 'absolute',
//         right: 15,
//         top: 12,
//     },
//     filterGroup: {
//         flexDirection: Platform.OS === 'web' ? 'row' : 'column',
//         gap: 10,
//         flex: Platform.OS === 'web' ? 2 : undefined,
//         minWidth: Platform.OS === 'web' ? 400 : '100%',
//     },
//     filterInput: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         fontSize: 16,
//         color: Colors.darkGray,
//         backgroundColor: Colors.white,
//         minWidth: Platform.OS === 'web' ? 180 : '100%',
//     },
//     pickerContainer: {
//         flex: 1,
//         borderColor: Colors.mediumGray,
//         borderWidth: 1,
//         borderRadius: 5,
//         overflow: 'hidden',
//         minWidth: Platform.OS === 'web' ? 180 : '100%',
//         justifyContent: 'center',
//         position: 'relative',
//         backgroundColor: Colors.white,
//     },
//     picker: {
//         height: Platform.OS === 'ios' ? 120 : 45,
//         width: '100%',
//         color: Colors.darkGray,
//     },
//     pickerItem: {
//         color: Colors.darkGray,
//     },
//     pickerIcon: {
//         position: 'absolute',
//         right: 15,
//         top: '50%',
//         marginTop: -7,
//         pointerEvents: 'none',
//     },
//     sortBtn: {
//         flexDirection: 'row',
//         backgroundColor: Colors.primary,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         minWidth: Platform.OS === 'web' ? 150 : '100%',
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//     },
//     sortText: {
//         color: Colors.white,
//         marginLeft: 8,
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     tableScrollHorizontal: {
//         // No specific styles needed unless you want to hide scrollbars globally or customize
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         backgroundColor: Colors.primary,
//         paddingVertical: 12,
//         paddingHorizontal: 8,
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//     },
//     headerCell: {
//         color: Colors.white,
//         fontWeight: 'bold',
//         fontSize: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     row: {
//         flexDirection: 'row',
//         paddingVertical: 10,
//         paddingHorizontal: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: Colors.mediumGray + '50',
//         alignItems: 'center',
//         borderRadius: 5,
//         marginBottom: 2,
//         elevation: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0.5 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//     },
//     pendingRow: {
//         backgroundColor: Colors.white,
//     },
//     approvedRow: {
//         backgroundColor: Colors.green + '15',
//     },
//     rejectedRow: {
//         backgroundColor: Colors.red + '15',
//     },
//     collectedRow: {
//         backgroundColor: Colors.accent + '15',
//     },
//     cell: {
//         paddingHorizontal: 4,
//         color: Colors.darkGray,
//         fontSize: 14,
//         minHeight: 40,
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//     },
//     actionCell: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 8,
//     },
//     readMoreBtn: {
//         flexDirection: 'row',
//         backgroundColor: Colors.blue,
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//         borderRadius: 6,
//         alignItems: 'center',
//         justifyContent: 'center',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//     },
//     btnText: {
//         color: Colors.white,
//         fontSize: 14,
//         fontWeight: '600',
//         marginLeft: 8,
//     },
//     emptyState: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: Colors.white,
//         borderRadius: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 1,
//         minHeight: 200,
//     },
//     emptyStateText: {
//         fontSize: 16,
//         color: Colors.darkGray,
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     tableScrollVertical: {
//         maxHeight: 400,
//     }
// });


//test 2
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Added MaterialCommunityIcons for a better icon
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a consistent color palette
const Colors = {
    primary: '#004225', // Dark Green
    secondary: '#3CB371', // Medium Green
    accent: '#FFD700', // Gold/Yellow for highlights
    white: '#FFFFFF',
    lightGray: '#F0F0F0',
    mediumGray: '#B0B0B0', // Slightly darker gray for better contrast
    darkGray: '#333333',
    red: '#DC3545', // Danger
    green: '#28A745', // Success
    blue: '#007BFF', // Info
    deepBlue: '#0056b3', // Darker blue for active states
    warmRed: '#C82333', // Slightly deeper red for active states
    vibrantGreen: '#218838', // Slightly deeper green for active states
};

// Backend URL - Make sure this matches your actual backend server IP and port
const BACKEND_URL = "http://192.168.1.5:5000"; 

export default function Trequests({ navigation }) {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [search, setSearch] = useState(''); // Single search state for all fields
    const [sortAsc, setSortAsc] = useState(true);
    const [loading, setLoading] = useState(true);
    const [adminCenterName, setAdminCenterName] = useState('Your Center');
    const [adminCenterId, setAdminCenterId] = useState(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    // Function to fetch admin details and requests
    const fetchAdminAndRequests = useCallback(async () => {
        setLoading(true);
        try {
            const storedToken = await AsyncStorage.getItem("token");
            const storedCenterId = await AsyncStorage.getItem("centerId");
            const storedCenterName = await AsyncStorage.getItem("centerName");

            if (!storedCenterId || !storedToken) {
                Alert.alert("Authentication Required", "Admin not logged in or center ID missing.");
                setLoading(false);
                // navigation.navigate('ALogin'); // Uncomment to navigate to login
                return;
            }

            setAdminCenterId(storedCenterId);
            setAdminCenterName(storedCenterName || 'Your Center');

            const response = await axios.get(`${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list/`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            const fetchedRequests = response.data.requests.map(req => ({
                id: req._id,
                name: req.fullName,
                phone: req.phoneNumber,
                location: req.location,
                pickupDate: req.pickupDate,
                pickupTime: req.pickupTime,
                scrapType: req.scrapType,
                weight: `${req.weight}kg`,
                image: req.imageUrl,
                status: req.status,
                scrapCentre: req.collectionCenter?.centerName || 'N/A',
                description: req.description,
            }));
            
            setRequests(fetchedRequests);
            setFilteredRequests(fetchedRequests);
        } catch (err) {
            console.error('Failed to fetch requests for admin center:', err.response?.data || err.message);
            Alert.alert("Error", err.response?.data?.message || "Failed to load requests for your center.");
            setRequests([]);
            setFilteredRequests([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAdminAndRequests();
            return () => {};
        }, [fetchAdminAndRequests])
    );

    // Apply search whenever `search` or `requests` change
    useEffect(() => {
        applySearch();
    }, [search, requests]);

    // Single search function for all fields
    const applySearch = () => {
        let result = [...requests];

        if (search) {
            const lowercasedSearch = search.toLowerCase();
            result = result.filter(req =>
                Object.values(req).some(value =>
                    String(value).toLowerCase().includes(lowercasedSearch)
                )
            );
        }
        setFilteredRequests(result);
    };

    const toggleSort = () => {
        const sorted = [...filteredRequests].sort((a, b) => {
            const dateA = new Date(a.pickupDate);
            const dateB = new Date(b.pickupDate);
            // If dates are the same, sort by pickup time
            if (dateA.getTime() === dateB.getTime()) {
                const timeA = a.pickupTime.toLowerCase().replace(/[^a-z0-9]/g, '');
                const timeB = b.pickupTime.toLowerCase().replace(/[^a-z0-9]/g, '');
                return sortAsc ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
            }
            return sortAsc ? dateA - dateB : dateB - dateA;
        });

        setFilteredRequests(sorted);
        setSortAsc(!sortAsc);
    };

    const navigateToDetails = (requestId) => {
        const requestToPass = requests.find(req => req.id === requestId);
        if (requestToPass) {
            navigation.navigate('RequestDetails', { requestData: requestToPass });
        } else {
            Alert.alert("Error", "Could not find details for this request.");
        }
    };

    // Function to open image modal
    const openImageModal = (imageUrl) => {
        setSelectedImageUri(imageUrl);
        setImageModalVisible(true);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading requests...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar / Dashboard Header */}
            <View style={styles.dashboardHeader}>
                <Text style={styles.dashboardTitle}>
                    <MaterialCommunityIcons name="clipboard-list-outline" size={28} color={Colors.white} /> Requests Dashboard
                </Text>
                <Text style={styles.centerName}>{adminCenterName}</Text>
            </View>

            <View style={styles.contentArea}>
                <Text style={styles.sectionHeader}>Pickup Requests Summary</Text>

                <View style={styles.controls}>
                    {/* Consolidated Search Input */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search all request fields..."
                            placeholderTextColor={Colors.mediumGray}
                            value={search}
                            onChangeText={setSearch}
                        />
                        <FontAwesome name="search" size={16} color={Colors.darkGray} style={styles.searchIcon} />
                    </View>

                    {/* Sort Button */}
                    <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
                        <FontAwesome name="sort" size={18} color={Colors.white} />
                        <Text style={styles.sortText}>Sort by Pickup Date {sortAsc ? '(Asc)' : '(Desc)'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Table/List View */}
                {filteredRequests.length === 0 ? (
                    <View style={styles.emptyState}>
                        <AntDesign name="inbox" size={50} color={Colors.mediumGray} />
                        <Text style={styles.emptyStateText}>No requests found for {adminCenterName}.</Text>
                        {search ? 
                            <Text style={styles.emptyStateText}>Try adjusting your search.</Text> :
                            <Text style={styles.emptyStateText}>Homeowners will post new requests here.</Text>
                        }
                    </View>
                ) : (
                    <ScrollView horizontal style={styles.tableScrollHorizontal}>
                        <View>
                            {/* Table Header */}
                            <View style={styles.tableHeader}>
                                <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Req ID</Text>
                                <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Scrap Type</Text>
                                <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>Status</Text>
                                <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Image</Text> {/* New Image Header */}
                                <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Action</Text>
                            </View>

                            {/* Table Rows */}
                            <ScrollView style={styles.tableScrollVertical}>
                                {filteredRequests.map((req) => (
                                    <TouchableOpacity 
                                        key={req.id} 
                                        style={[styles.row, 
                                            req.status === 'approved' ? styles.approvedRow : 
                                            req.status === 'rejected' ? styles.rejectedRow : 
                                            req.status === 'collected' ? styles.collectedRow : 
                                            styles.pendingRow
                                        ]}
                                        onPress={() => navigateToDetails(req.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[styles.cell, { width: 120 }]}>{req.id.substring(0, 8)}...</Text> {/* Truncate ID */}
                                        <Text style={[styles.cell, { width: 150 }]}>{req.scrapType}</Text>
                                        <Text style={[styles.cell, { width: 100 }, 
                                            req.status === 'approved' ? {color: Colors.green} : 
                                            req.status === 'rejected' ? {color: Colors.red} : 
                                            req.status === 'collected' ? {color: Colors.primary} : 
                                            {color: Colors.blue} 
                                        ]}>
                                            {req.status ? req.status.toUpperCase() : 'PENDING'}
                                        </Text>
                                        {/* Image Cell - View Button */}
                                        <View style={[styles.cell, { width: 120, justifyContent: 'center' }]}>
                                            {req.image ? (
                                                <TouchableOpacity 
                                                    onPress={() => openImageModal(req.image)} 
                                                    style={styles.viewImageBtn}
                                                >
                                                    <FontAwesome name="eye" size={16} color={Colors.deepBlue} />
                                                    <Text style={styles.viewImageText}>View Image</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <Text style={styles.noImageText}>No Image</Text>
                                            )}
                                        </View>
                                        {/* Action Cell */}
                                        <View style={[styles.actionCell, { width: 120 }]}>
                                            <TouchableOpacity
                                                style={styles.readMoreBtn}
                                                onPress={() => navigateToDetails(req.id)}
                                            >
                                                <Text style={[styles.btnText, {marginLeft: 0}]}>Details</Text>
                                                <AntDesign name="right" size={12} color={Colors.white} style={{marginLeft: 5}} />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </ScrollView>
                )}
            </View>

            {/* Image Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={imageModalVisible}
                onRequestClose={() => setImageModalVisible(false)}
            >
                <View style={styles.imageModalBackground}>
                    <TouchableOpacity 
                        style={styles.closeModalButton} 
                        onPress={() => setImageModalVisible(false)}
                    >
                        <AntDesign name="closecircle" size={30} color={Colors.white} />
                    </TouchableOpacity>
                    {selectedImageUri ? (
                        <Image source={{ uri: selectedImageUri }} style={styles.fullImage} resizeMode="contain" />
                    ) : (
                        <Text style={styles.modalNoImageText}>No image available.</Text>
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.darkGray,
    },
    dashboardHeader: {
        backgroundColor: Colors.primary,
        padding: 20,
        paddingTop: Platform.OS === 'web' ? 20 : 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    dashboardTitle: {
        fontSize: 26,
        color: Colors.white,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    centerName: {
        fontSize: 18,
        color: Colors.white,
        fontStyle: 'italic',
    },
    contentArea: {
        flex: 1,
        padding: 20,
    },
    sectionHeader: {
        fontSize: 22,
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondary,
        paddingBottom: 5,
    },
    controls: {
        flexDirection: 'column', // Stack controls vertically
        marginBottom: 20,
        gap: 15, // Space between controls
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    inputGroup: {
        position: 'relative',
        width: '100%', // Full width
    },
    searchInput: {
        width: '100%',
        borderColor: Colors.mediumGray,
        borderWidth: 1,
        paddingVertical: 12, // Increased padding
        paddingHorizontal: 15,
        borderRadius: 8, // More rounded
        fontSize: 16,
        paddingRight: 45, // Space for icon
        color: Colors.darkGray,
        backgroundColor: Colors.white,
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        marginTop: -8, // Center icon vertically
    },
    sortBtn: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingVertical: 12, // Increased padding
        paddingHorizontal: 15,
        borderRadius: 8, // More rounded
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    sortText: {
        color: Colors.white,
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 16,
    },
    tableScrollHorizontal: {
        // No specific styles needed unless you want to hide scrollbars globally or customize
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    headerCell: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4, // Consistent padding
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12, // Increased padding
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mediumGray + '50',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 4, // More space between rows
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        backgroundColor: Colors.white, // Default row background
    },
    pendingRow: {
        // backgroundColor: Colors.white, // No specific background for pending, default to white
    },
    approvedRow: {
        backgroundColor: Colors.green + '15',
    },
    rejectedRow: {
        backgroundColor: Colors.red + '15',
    },
    collectedRow: {
        backgroundColor: Colors.accent + '15',
    },
    cell: {
        paddingHorizontal: 4,
        color: Colors.darkGray,
        fontSize: 14,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    actionCell: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    readMoreBtn: {
        flexDirection: 'row',
        backgroundColor: Colors.blue,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    btnText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
        // marginLeft removed, combined with icon
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        minHeight: 200,
    },
    emptyStateText: {
        fontSize: 16,
        color: Colors.darkGray,
        marginTop: 10,
        textAlign: 'center',
    },
    tableScrollVertical: {
        maxHeight: 400, // Limit height of the scrollable table body
    },
    // Image Modal Styles
    imageModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeModalButton: {
        position: 'absolute',
        top: Platform.OS === 'web' ? 20 : 50,
        right: 20,
        zIndex: 1, // Ensure it's above the image
        padding: 10,
    },
    fullImage: {
        width: '90%', // Occupy most of the screen
        height: '80%',
        borderRadius: 10,
    },
    modalNoImageText: {
        color: Colors.white,
        fontSize: 18,
    },
    viewImageBtn: {
        flexDirection: 'row',
        backgroundColor: Colors.blue + '20', // Light blue background
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.blue,
        borderWidth: 1,
        gap: 5,
    },
    viewImageText: {
        color: Colors.deepBlue,
        fontSize: 12,
        fontWeight: 'bold',
    },
    noImageText: {
        color: Colors.mediumGray,
        fontSize: 12,
        fontStyle: 'italic',
    }
});