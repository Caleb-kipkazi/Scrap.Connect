import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  FlatList, // Using FlatList for efficient list rendering
  StatusBar, // For status bar styling
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment'; // For date formatting

// Define some colors for consistent styling
const PRIMARY_COLOR = '#3CB371'; // A nice green
const ACCENT_COLOR = '#004225'; // Darker green
const TEXT_COLOR = '#333333';
const LIGHT_GRAY = '#F0F0F0';
const BORDER_COLOR = '#DDDDDD';
const WHITE = '#FFFFFF';
const DANGER_COLOR = '#FF6347'; // Tomato red for warnings/errors

const AdminFeedbackScreen = () => {
  const [centerId, setCenterId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch feedbacks from the backend
  const fetchFeedbacks = async (id) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      console.log(`Fetching feedbacks for center ID: ${id}`);
      const response = await axios.get(`http://192.168.1.5:5000/api/v1/feedback/center/${id}`);
      console.log('Feedback API Response:', response.data);
      if (response.data && Array.isArray(response.data.feedbacks)) {
        setFeedbacks(response.data.feedbacks);
      } else {
        setFeedbacks([]); // Ensure it's an empty array if no feedbacks
        Alert.alert('No Feedbacks', 'No feedback found for this center.');
      }
    } catch (err) {
      console.error('Fetch feedbacks error:', err.response?.data || err.message);
      setError('Failed to load feedbacks. Please try again.');
      setFeedbacks([]); // Clear feedbacks on error
      Alert.alert('Error', err.response?.data?.message || 'Could not load feedbacks.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Function to load admin's center ID from AsyncStorage
  const loadAdminCenterId = async () => {
    try {
      const storedCenterId = await AsyncStorage.getItem('centerId');
      console.log('Loaded Center ID from AsyncStorage:', storedCenterId);
      if (storedCenterId) {
        setCenterId(storedCenterId);
        fetchFeedbacks(storedCenterId);
      } else {
        setError('Admin Center ID not found. Please log in as an administrator.');
        setLoading(false);
        Alert.alert('Error', 'Admin session expired or not found. Please log in.');
      }
    } catch (err) {
      console.error('Error loading admin center ID:', err);
      setError('Could not load admin information.');
      setLoading(false);
    }
  };

  // Effect to load data on component mount
  useEffect(() => {
    loadAdminCenterId();
  }, []);

  // Callback for pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (centerId) {
      fetchFeedbacks(centerId);
    } else {
      loadAdminCenterId(); // Reload center ID if not present
    }
  }, [centerId]); // Depend on centerId so it refetches if centerId becomes available

  // Render item for FlatList
  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackCard}>
      <View style={styles.row}>
        <Text style={styles.label}>Request ID:</Text>
        <Text style={styles.value}>{item.requestId?._id || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Collector ID:</Text>
        <Text style={styles.value}>{item.collector?._id || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Collector Name:</Text>
        <Text style={styles.value}>{item.collector?.fullName || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pickup Done:</Text>
        <Text style={styles.value}>{item.pickupDone ? 'Yes' : 'No'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={[styles.value, styles.ratingText]}>{item.rating || 'N/A'} / 5</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.label}>Comment:</Text>
        <Text style={styles.commentValue}>{item.comment || 'No comment provided.'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Submitted At:</Text>
        <Text style={styles.value}>
          {item.submittedAt ? moment(item.submittedAt).format('MMM Do, YYYY h:mm A') : 'N/A'}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading feedbacks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ACCENT_COLOR} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Collector Feedbacks</Text>
      </View>
      {feedbacks.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.center}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={PRIMARY_COLOR}
              colors={[PRIMARY_COLOR]}
            />
          }
        >
          <Text style={styles.noFeedbacksText}>
            No feedbacks available for your collectors.
          </Text>
          <Text style={styles.noFeedbacksSubText}>Pull down to refresh.</Text>
        </ScrollView>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item._id}
          renderItem={renderFeedbackItem}
          contentContainerStyle={styles.flatListContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={PRIMARY_COLOR}
              colors={[PRIMARY_COLOR]}
            />
          }
        />
      )}
    </View>
  );
};

export default AdminFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
  },
  header: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: WHITE,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: DANGER_COLOR,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noFeedbacksText: {
    fontSize: 18,
    color: TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  noFeedbacksSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  flatListContent: {
    padding: 10,
  },
  feedbackCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_COLOR,
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_COLOR,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  ratingText: {
    fontWeight: 'bold',
    color: ACCENT_COLOR, // Make rating stand out
  },
  commentContainer: {
    marginTop: 5,
    marginBottom: 10,
    borderTopWidth: 0.5,
    borderTopColor: BORDER_COLOR,
    paddingTop: 10,
  },
  commentValue: {
    fontSize: 14,
    color: TEXT_COLOR,
    lineHeight: 20,
    marginTop: 5,
  },
});
