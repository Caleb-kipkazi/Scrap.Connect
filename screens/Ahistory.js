import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView, // Added for better layout on different devices
  StatusBar,    // Added for status bar styling
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Added FontAwesome5 for icons
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
const TAB_INACTIVE_BG = "#E0E0E0"; // For inactive tabs background
const ACTIVE_BORDER = "#1B5E20"; // Darker green for active tab border
// --- END COLOR CONSTANTS ---

const baseUrl = 'http://192.168.189.119:5000/api/v1';

const Ahistory = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('approved');
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const centerId = await AsyncStorage.getItem('centerId');
      // Added adminToken retrieval as it's typically required for protected routes
      // Even if your current backend setup doesn't strictly enforce it for these
      // particular endpoints, it's good practice.
      const adminToken = await AsyncStorage.getItem('adminToken');

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      const approvedResponse = await axios.get(`${baseUrl}/requests/center/${centerId}/list?status=approved`, config);
      const rejectedResponse = await axios.get(`${baseUrl}/requests/center/${centerId}/list?status=rejected`, config);

      setApprovedRequests(approvedResponse.data.requests || []);
      setRejectedRequests(rejectedResponse.data.requests || []);
    } catch (error) {
      console.error('Error fetching requests:', error.message);
      // You might want to add a state to show error messages to the user here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderRequestRow = (req, index) => {
    if (activeTab === 'approved') {
      return (
        <View key={index} style={styles.tableRow}>
          {/* Changed slice length for better display in limited space */}
          <Text style={[styles.cell, { flex: 1.2 }]}>{req._id.slice(0, 8)}...</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{req.homeownerId?.username || 'N/A'}</Text>
          <Text style={[styles.cell, { flex: 1.2 }]}>{new Date(req.pickupDate).toLocaleDateString()}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{req.collectorId?.fullName || 'Not Assigned'}</Text>
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.tableRow}>
          {/* Changed slice length for better display */}
          <Text style={[styles.cell, { flex: 1.2 }]}>{req._id.slice(0,8)}...</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{req.homeownerId?.username || 'N/A'}</Text>
        </View>
      );
    }
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
    } else {
      return (
        <View style={[styles.tableHeader, { backgroundColor: REJECTED_RED }]}>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Req ID</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Homeowner</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_GREY_BG} />
      <ScrollView contentContainerStyle={styles.container}>
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
            style={[styles.tab, activeTab === 'rejected' && styles.activeTab]}
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
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={PRIMARY_GREEN} />
            <Text style={styles.loadingText}>Loading history data...</Text>
          </View>
        ) : (
          <>
            {renderTableHeader()}
            {(activeTab === 'approved' ? approvedRequests : rejectedRequests).length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="information-circle-outline" size={30} color={TEXT_MUTED} />
                <Text style={styles.emptyText}>No {activeTab} requests found for your center.</Text>
              </View>
            ) : (
              (activeTab === 'approved' ? approvedRequests : rejectedRequests).map(renderRequestRow)
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
    padding: 20,
    backgroundColor: LIGHT_GREY_BG,
    flexGrow: 1, // Ensures ScrollView takes full height
  },
  mainTitle: { // Renamed from 'title' for clarity
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_GREEN,
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeader: { // Added for a secondary header text
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
    overflow: 'hidden', // Ensures inner elements respect border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row', // Align icon and text
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: WHITE, // Default background
    borderBottomWidth: 3,
    borderBottomColor: 'transparent', // Default transparent border
  },
  activeTab: {
    backgroundColor: PRIMARY_GREEN,
    borderBottomColor: ACTIVE_BORDER, // Darker green border for active tab
  },
  tabIcon: { // Style for the icon within the tab
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_DARK, // Default text color for inactive
  },
  activeText: { // Text color for active tab
    color: WHITE,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_GREEN, // Dark green for approved header
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
    color: WHITE, // White text for header
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: 14, // Increased padding for better spacing
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    borderRadius: 8, // Rounded corners for rows
    marginBottom: 5, // Small gap between rows
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
    fontSize: 13,
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
  emptyContainer: { // New style for empty state message
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