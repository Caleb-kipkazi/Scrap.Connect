import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HistoryScreen from './screens/history'; // Adjust path if needed
import WelcomeScreen from './screens/Welcome'; // Adjust path if needed
import LoginScreen from './screens/login'; // You’ll create this later
import signupScreen from './screens/signup';
import ResetpasswordScreen from './screens/Resetpassword';
import MainNavigator from './navigation/mainNavigator'; // Adjust path if needed
import AdminLogin from './screens/Alogin';
import CollectorLogin from './screens/Clogin';
import AdminSignUp from './screens/Asignup';
import CollectorSignUp from './screens/Csignup';
import AdminResetPassword from './screens/AResetpassword';
import CollectorResetPassword from './screens/CResetpassword';
import AmainNavigator from './navigation/AmainNavigator';
import CmainNavigator from './navigation/CmainNavigator';
// import CollectorDashboard from './screens/CollectorDashboard';
// import HomeownerDashboard from './screens/HomeownerDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="History" component={HistoryScreen}/> */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="SignUp" component={signupScreen} />
        <Stack.Screen name="ResetPassword" component={ResetpasswordScreen} /> 
        <Stack.Screen name="mainNavigator" component={MainNavigator} />
        <Stack.Screen name="AmainNavigator" component={AmainNavigator}/>
        <Stack.Screen name="ALogin" component={AdminLogin}/>
        <Stack.Screen name="Asignup" component={AdminSignUp}/>
        <Stack.Screen name="AResetpassword" component={AdminResetPassword}/>
        <Stack.Screen name="Clogin" component={CollectorLogin}/>
        <Stack.Screen name="Csignup" component={CollectorSignUp}/>
        <Stack.Screen name="CResetpassword" component={CollectorResetPassword}/>
        <Stack.Screen name="CmainNavigator" component={CmainNavigator} />
        
        {/* <Stack.Screen name="HomeownerDashboard" component={HomeownerDashboard} /> */}

        
        {/* <Stack.Screen name="CollectorDashboard" component={CollectorDashboard} />
        <Stack.Screen name="HomeownerDashboard" component={HomeownerDashboard} /> */}
        {/* Add more screens as needed */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

