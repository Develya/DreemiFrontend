import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LineChart, ruleTypes } from 'react-native-gifted-charts';

import SleepLogController from '../controllers/sleeplogsController';
import UserController from '../controllers/userController';

import config from '../config.json';
const primaryColor = config.primaryColor;

const SleepLastSevenDays = () => {
    const [sleepLogs, setSleepLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [maxHours, setMaxHours] = React.useState(null);
    const [averageHoursSlept, setAverageHoursSlept] = React.useState(null);
    const [user, setUser] = React.useState(null);
    
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
                    const fetchedSleepLogs = await SleepLogController.getSleepLogsLastSevenDays(user);
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
        if (sleepLogs.length > 0) {
            const formatted = sleepLogs.map(log => ({
                value: log.durationInHours(),
                label: log.formattedEndDate(),
            }));
            setData(formatted);
        }
    }, [sleepLogs]);

    React.useEffect(() => {
        setMaxHours(Math.max(...data.map(item => item.value)))
        setAverageHoursSlept(Math.floor(sleepLogs.reduce((previous, current) => {
            return previous + current.durationInHours();
        }, 0) / sleepLogs.length));
        setLoading(false);
    }, [data]);

    return (
        <>
            {!loading &&
                data.length < 7 ? (
                    <Text style={styles.message}>Not enough data.</Text>
                ) : (
                    <>
                        <Text style={styles.h1}>Last 7 days</Text>
                        <Text style={styles.h2}>Average this week: {averageHoursSlept} hours</Text>
                        <LineChart 

                            data={data}

                            thickness={1}
                            yAxisThickness={0}
                            yAxisColor='#ededed'
                            xAxisColor='#ededed'
                            yAxisLabelSuffix=' h'
                            areaChart 
                            dataPointsColor={primaryColor}
                            color={primaryColor}
                            verticalLinesColor={primaryColor}

                            rulesColor='#ededed' 
                            rulesType={ruleTypes.SOLID} 
                            maxValue={maxHours} 

                            isAnimated 
                            animationDuration={3000} 

                            startFillColor={primaryColor} endFillColor={primaryColor} 
                            startOpacity={0.1} endOpacity={0}
                            
                            initialSpacing={20} spacing={50}
                        />
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
    }
});

export default SleepLastSevenDays;