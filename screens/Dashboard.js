import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SleepSummary from '../components/SleepSummary';

import config from '../config.json';
const primaryColor = config.primaryColor;

import UserController from '../controllers/userController';
import SleepLogController from '../controllers/sleeplogsController';

const Dashboard = ({ navigation }) => {
    const [user, setUser] = React.useState(null);
    const [sleepLogs, setSleepLogs] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await UserController.getUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (user !== null) {
                    const fetchedSleepLogs = await SleepLogController.getAllSleepLogs(user);
                    setSleepLogs(fetchedSleepLogs);
                }
            } catch (error) {
                console.error('Error fetching sleep logs:', error);
            }
        };
        fetchData();
    }, [user]);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title='Logout' onPress={() => handleLogout()} color={primaryColor}/>
        });
    }, []);

    const handleLogout = async () => {
        try {
            await UserController.logout();
            navigation.replace('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            {
                sleepLogs.length < 7 ? (
                    <Text style={styles.message}>Not enough data.</Text>
                ) : (
                    <SleepSummary sleepLogs={sleepLogs}/>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        margin: 30,
        fontSize: 20,
        fontWeight: '300',
    },
});

export default Dashboard;
