import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl, // Added for pull-to-refresh
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// --- DEFINE COLOR CONSTANTS ---
const PRIMARY_GREEN = "#2E7D32"; // Dark Green
const ACCENT_GREEN = "#4CAF50"; // Medium Green
const LIGHT_GREY_BG = "#F5F5F5"; // Very light grey background
const WHITE = "#FFFFFF";
const TEXT_DARK = "#333333";
const TEXT_MUTED = "#666666";
const BORDER_COLOR = "#E0E0E0";
const REJECTED_RED = "#D32F2F"; // A more subtle red for rejected status
const COLLECTED_BLUE = "#1976D2"; // A distinct color for collected tab
const TAB_INACTIVE_BG = "#E0E0E0"; // For inactive tabs background
const ACTIVE_BORDER = "#1B5E20"; // Darker green for active tab border
// --- END COLOR CONSTANTS ---

const baseUrl = 'http://192.168.189.119:5000/api/v1';

const Ahistory = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [collectedRequests, setCollectedRequests] = useState([]); // New state for collected requests
  const [activeTab, setActiveTab] = useState('approved');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // New state for pull-to-refresh

  // Updated fetchRequests to use 'token' and fetch collected requests
  const fetchRequests = useCallback(async () => {
    setLoading(true); // Set loading to true at the start of fetch
    try {
      const centerId = await AsyncStorage.getItem('centerId');
      const token = await AsyncStorage.getItem('token'); // CRITICAL FIX: Changed from 'adminToken' to 'token'

      if (!token) {
        console.warn('❌ No authentication token found for center. Cannot fetch history.');
        // Optionally, navigate back to login here or show a persistent error
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use the generic 'token'
        },
      };

      const approvedResponse = await axios.get(`${baseUrl}/requests/center/${centerId}/list?status=approved`, config);
      const rejectedResponse = await axios.get(`${baseUrl}/requests/center/${centerId}/list?status=rejected`, config);
      // New API call for 'collected' requests
      const collectedResponse = await axios.get(`${baseUrl}/requests/center/${centerId}/list?status=collected`, config);

      setApprovedRequests(approvedResponse.data.requests || []);
      setRejectedRequests(rejectedResponse.data.requests || []);
      setCollectedRequests(collectedResponse.data.requests || []); // Set collected requests state

    } catch (error) {
      console.error('Error fetching requests:', error.response?.data || error.message);
      Alert.alert("Fetch Error", error.response?.data?.message || "Failed to load request history.");
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing animation
    }
  }, []); // Dependencies are empty as it doesn't depend on external state/props

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]); // Add fetchRequests to dependencies for useCallback

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const renderRequestRow = (req, index) => {
    if (activeTab === 'approved') {
      return (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 1.2 }]}>{req._id.slice(-8)}</Text> {/* Show last 8 chars for brevity */}
          <Text style={[styles.cell, { flex: 1 }]}>{req.homeownerId?.username || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.2 }]}>{new Date(req.pickupDate).toLocaleDateString()}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{req.collectorId?.fullName || 'Not Assigned'}</Text>
        </View>
      );
    } else if (activeTab === 'rejected') {
      return (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 1.2 }]}>{req._id.slice(-8)}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{req.homeownerId?.username || 'N/A'}</Text>
        </View>
      );
    } else if (activeTab === 'collected') { // New rendering for collected requests
      return (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 1 }]}>{req._id.slice(-6)}</Text> {/* Shorter ID for more space */}
          <Text style={[styles.cell, { flex: 1.2 }]}>{req.homeownerId?.username || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.4 }]}>{new Date(req.completedAt).toLocaleDateString() || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.5 }]}>{req.homeownerId?.phoneNo || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.2 }]}>{req.collectorId?.fullName || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.5 }]}>{req.collectorId?.phoneNo || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.2 }]}>Ksh {req.amountPaid?.toFixed(2) || '0.00'}</Text>
        </View>
      );
    }
    return null; // Should not happen
  };

  const renderTableHeader = () => {
    if (activeTab === 'approved') {
      return (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Req ID</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Homeowner</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Pick-up Date</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Collector</Text>
        </View>
      );
    } else if (activeTab === 'rejected') {
      return (
        <View style={[styles.tableHeader, { backgroundColor: REJECTED_RED }]}>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Req ID</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Homeowner</Text>
        </View>
      );
    } else if (activeTab === 'collected') { // New header for collected requests
      return (
        <View style={[styles.tableHeader, { backgroundColor: COLLECTED_BLUE }]}>
          <Text style={[styles.headerCell, { flex: 1 }]}>Req ID</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Homeowner</Text>
          <Text style={[styles.headerCell, { flex: 1.4 }]}>Completed At</Text>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>H/O Phone</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Collector</Text>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>Col Phone</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Paid (Ksh)</Text>
        </View>
      );
    }
    return null;
  };

  const getCurrentRequests = () => {
    if (activeTab === 'approved') {
      return approvedRequests;
    } else if (activeTab === 'rejected') {
      return rejectedRequests;
    } else if (activeTab === 'collected') {
      return collectedRequests;
    }
    return [];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_GREY_BG} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_GREEN} />
        }
      >
        <Text style={styles.mainTitle}>Request History</Text>
        <Text style={styles.subHeader}>Overview of requests handled by your center.</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'approved' && styles.activeTab]}
            onPress={() => setActiveTab('approved')}
          >
            <FontAwesome5
              name="check-circle"
              size={16}
              color={activeTab === 'approved' ? WHITE : PRIMARY_GREEN}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === 'approved' && styles.activeText]}>Approved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'rejected' && styles.activeTab, { borderRightWidth: 0 }]} // No border for the middle tab
            onPress={() => setActiveTab('rejected')}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={activeTab === 'rejected' ? WHITE : REJECTED_RED}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === 'rejected' && styles.activeText]}>Rejected</Text>
          </TouchableOpacity>

          {/* New 'Collected' tab */}
          <TouchableOpacity
            style={[styles.tab, activeTab === 'collected' && styles.activeTab]}
            onPress={() => setActiveTab('collected')}
          >
            <FontAwesome5
              name="box-open" // Icon for collected/completed
              size={16}
              color={activeTab === 'collected' ? WHITE : COLLECTED_BLUE}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === 'collected' && styles.activeText]}>Collected</Text>
          </TouchableOpacity>
        </View>

        {loading && !refreshing ? ( // Only show full loading indicator initially, not on refresh
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={PRIMARY_GREEN} />
            <Text style={styles.loadingText}>Loading history data...</Text>
          </View>
        ) : (
          <>
            {renderTableHeader()}
            {getCurrentRequests().length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="information-circle-outline" size={30} color={TEXT_MUTED} />
                <Text style={styles.emptyText}>No {activeTab} requests found for your center.</Text>
              </View>
            ) : (
              getCurrentRequests().map(renderRequestRow)
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: LIGHT_GREY_BG,
  },
  container: {
    padding: 15, // Slightly reduced padding for more space
    backgroundColor: LIGHT_GREY_BG,
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_GREEN,
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 15,
    color: TEXT_MUTED,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: WHITE,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    borderRightWidth: 1, // Add border to separate tabs
    borderRightColor: BORDER_COLOR,
  },
  activeTab: {
    backgroundColor: PRIMARY_GREEN,
    borderBottomColor: ACTIVE_BORDER,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_DARK,
  },
  activeText: {
    color: WHITE,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: WHITE,
    fontSize: 12, // Slightly smaller font for more columns
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: TEXT_DARK,
    fontSize: 11, // Smaller font for more compact display
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    color: TEXT_MUTED,
    marginTop: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: WHITE,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: TEXT_MUTED,
    textAlign: 'center',
  },
});

export default Ahistory;
