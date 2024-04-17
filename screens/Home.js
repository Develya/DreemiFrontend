import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import UserController from '../controllers/userController';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
    const checkIfLoggedIn = async () => {
        //AsyncStorage.clear();
        const user = await UserController.getUser();

        if (user !== null) {
            //user.refreshData(); // Make sure that fitbit is authorized beforehand
            await navigation.replace('Dashboard');
        } else {
            await navigation.replace('Login');
        }

        await SplashScreen.hideAsync();
    };

    // Check if user is logged in on load
    React.useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return;
}

export default Home;