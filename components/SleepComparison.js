import * as React from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { LineChart, ruleTypes } from 'react-native-gifted-charts';

import SleepLogController from '../controllers/sleeplogsController';
import UserController from '../controllers/userController';

import config from '../config.json';
const primaryColor = config.primaryColor;

const SleepComparison = () => {
    const [sleepLogs7, setSleepLogs7] = React.useState([]);
    const [sleepLogs14, setSleepLogs14] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [sum7, setSum7] = React.useState(0);
    const [sum14, setSum14] = React.useState(0);
    const [average7, setAverage7] = React.useState(0);
    const [average14, setAverage14] = React.useState(0);

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
                    const fetchedSleepLogs = await SleepLogController.getSleepLogsLastFourteenDays(user);
                    logs7 = [];
                    logs14 = [];
                    fetchedSleepLogs.forEach((sleepLog, index) => {
                        if (index < 7) {
                            logs7.push(sleepLog);
                        } else {
                            logs14.push(sleepLog);
                        }
                    });
                    setSleepLogs7(logs7);
                    setSleepLogs14(logs14);
                }
            } catch (error) {
                console.error('Error fetching sleep logs:', error);
            }
        };
        fetchData();
    }, [user]);

    React.useEffect(() => {
        const sumOfSleeps7 = sleepLogs7.reduce((previous, current) => {
            return previous + current.durationInHours();
        }, 0);
        const sumOfSleeps14 = sleepLogs14.reduce((previous, current) => {
            return previous + current.durationInHours();
        }, 0);
        setSum7(sumOfSleeps7);
        setSum14(sumOfSleeps14);
        setAverage7(sumOfSleeps7 / sleepLogs7.length);
        setAverage14(sumOfSleeps14 / sleepLogs14.length);
    }, [sleepLogs14]);

    return (
        <>
            {
                <>
                    <Text style={styles.h1}>Comparison</Text>
                    <Text style={styles.h2}>Last week: {sum7.toFixed(2)} hours slept. The week before: {sum14.toFixed(2)} hours slept</Text>
                    <Text style={styles.h2}>Average last week: {average7.toFixed(2)}. Average the week before: {average14.toFixed(2)}</Text>
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

export default SleepComparison;