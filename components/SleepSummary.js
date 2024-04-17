import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import config from '../config.json';
const primaryColor = config.primaryColor;

const SleepSummary = ({sleepLogs}) => {

    const data = sleepLogs.map(log => ({
        value: log.durationInHours(),
        label: log.formattedStartDate(),
    }));

    const averageHoursSlept = sleepLogs.reduce((previous, current) => {
        return previous + current.durationInHours();
    }, 0) / sleepLogs.length;

    return (
        <>
            <Text style={styles.h1}>Last 7 days</Text>
            <LineChart areaChart hideDataPoints showVerticalLines isAnimated animationDuration={3000} startFillColor={primaryColor} startOpacity={1} endOpacity={0.3} initialSpacing={0} data={data} spacing={60} thickness={5} yAxisColor={primaryColor} verticalLinesColor={primaryColor} xAxisColor={primaryColor} color={primaryColor} />
            <Text style={styles.h2}>Average: {Math.floor(averageHoursSlept)} hours per night.</Text>
        </>
    );
};

const styles = StyleSheet.create({
    h1: {
        margin: 30,
        fontSize: 30,
        fontWeight: '400'
    },
    h2: {
        margin: 30,
        fontSize: 20,
        fontWeight: '300'
    }
});

export default SleepSummary;