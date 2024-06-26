import * as React from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { LineChart, ruleTypes } from 'react-native-gifted-charts';

import SleepLogController from '../controllers/sleeplogsController';
import UserController from '../controllers/userController';

import config from '../config.json';
const primaryColor = config.primaryColor;

const SleepSummary = () => {
    const [sleepLogs, setSleepLogs] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [sum, setSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);

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
                    const fetchedSleepLogs = await SleepLogController.getSleepLogs(user);
                    fetchedSleepLogs.reverse();
                    setSleepLogs(fetchedSleepLogs);
                }
            } catch (error) {
                console.error('Error fetching sleep logs:', error);
            }
        };
        fetchData();
    }, [user]);

    React.useEffect(() => {
        const sumOfSleeps = sleepLogs.reduce((previous, current) => {
            return previous + current.durationInHours();
        }, 0);
        setSum(sumOfSleeps);
        setAverage(sumOfSleeps / sleepLogs.length);
    }, [sleepLogs]);

    return (
        <>
            {
                <>
                    <Text style={styles.h1}>Summary</Text>
                    <Text style={styles.h2}>You have slept {sum.toFixed(0)} hours in total.</Text>
                    <Text style={styles.h2}>On average, you have slept {average.toFixed(2)} hours per night.</Text>
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    h1: {
        margin: 20,
        marginBottom: 0,
        marginLeft: 7,
        fontSize: 30,
        fontWeight: '400'
    },
    h2: {
        margin: 20,
        marginTop: 0,
        marginLeft: 7,
        fontSize: 12,
        fontWeight: '400'
    },
    label: {
        fontWeight: '300'
    },
    message: {
        margin: 30,
        fontSize: 20,
        fontWeight: '300',
    },
    input: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    card: {
        width: 400,
        paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 15,
        marginTop: 10,
        marginBottom: 10,
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
});

export default SleepSummary;