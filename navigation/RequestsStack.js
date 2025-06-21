// src/navigation/RequestsStack.js
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import your Request screens
// import Trequests from '../screens/Trequests'; // Your summary screen
// import RequestDetailsScreen from '../screens/RequestDetailsScreen'; // Your new detail screen

// const Stack = createNativeStackNavigator();

// export default function RequestsStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* This is the first screen shown when the "Requests" tab is active */}
//       <Stack.Screen name="RequestsSummary" component={Trequests} />

//       {/* This is the screen that "Read More" will navigate to */}
//       <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
//     </Stack.Navigator>
//   );
// }


// navigation/RequestsStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Trequests from '../screens/Trequests';
import RequestDetailsScreen from '../screens/RequestDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RequestsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trequests" component={Trequests} options={{ title: 'Requests' }} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ title: 'Request Details' }} />
    </Stack.Navigator>
  );
}
