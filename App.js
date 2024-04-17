import * as React from 'react';
import 'expo-dev-client'
import 'dotenv/config';

/* React Navigation*/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Screens */
import Login from './screens/Login';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import FitbitPermission from './screens/FitbitPermission';
import FitbitRedirect from './screens/FitbitRedirect';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="FitbitPermission" component={FitbitPermission} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
