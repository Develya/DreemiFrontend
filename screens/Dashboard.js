import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import SleepLastSevenDays from '../components/SleepLastSevenDays';
import SleepByPeriod from '../components/SleepByPeriod';
import SleepSummary from '../components/SleepSummary';

import config from '../config.json';
const primaryColor = config.primaryColor;

import UserController from '../controllers/userController';
import SleepComparison from '../components/SleepComparison';

const Dashboard = ({ navigation }) => {
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
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.sevenDaysContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <SleepLastSevenDays/>
                        </View>
                    </ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <SleepByPeriod/>
                        </View>
                    </ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <SleepSummary/>
                        </View>
                    </ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <SleepComparison/>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sevenDaysContainer: {
        //backgroundColor: '#fafafa'
    },
    card: {
        width: 400,
        paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 15,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden', // Hides overflow content
    },
    message: {
        margin: 30,
        fontSize: 20,
        fontWeight: '300',
    },
});

export default Dashboard;
