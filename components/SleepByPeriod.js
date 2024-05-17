import * as React from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { LineChart, ruleTypes } from 'react-native-gifted-charts';

import SleepLogController from '../controllers/sleeplogsController';
import UserController from '../controllers/userController';

import config from '../config.json';
const primaryColor = config.primaryColor;

const SleepByPeriod = () => {
    const [sleepLogs, setSleepLogs] = React.useState([]);
    const [user, setUser] = React.useState(null);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [showResults, setShowResults] = React.useState(false);

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

    const handleSearch = async () => {
        try {
            const fetchedSleepLogs = await SleepLogController.getSleepLogsByPeriod(user, new Date(startDate), new Date(endDate));
            setSleepLogs(fetchedSleepLogs);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }

    const handleBack = async () => {
        setSleepLogs([]);
        setStartDate("");
        setEndDate("");
        setShowResults(false);
    }

    return (
        <>
            { showResults ? (
                sleepLogs.length == 0 ? (
                    <Text style={styles.message}>Not enough data.</Text>
                ) : (
                    <>
                        <Text style={styles.h1}>For period</Text>
                        <Text style={styles.h2}>{startDate} to {endDate}</Text>
                        {
                            sleepLogs.map((sleepLog) => (
                                <>
                                    <View style={styles.card} key={sleepLog.logID}>
                                        <Text>{sleepLog.formattedEndDateLong()}</Text>
                                        <Text>{sleepLog.durationInHours()} hours slept</Text>
                                    </View>
                                </>
                            ))
                        }
                        <Button title='Back' onPress={() => handleBack()} color={primaryColor}/>
                    </>
                )
            ) : (
                <>
                    <Text style={styles.h1}>For period</Text>
                    <TextInput style={styles.input} onChangeText={setStartDate} value={startDate} placeholder='Start date'/>
                    <TextInput style={styles.input} onChangeText={setEndDate} value={endDate} placeholder='End date'/>
                    <Button title='Search' onPress={() => handleSearch()} color={primaryColor}/>
                </>
            )

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

export default SleepByPeriod;