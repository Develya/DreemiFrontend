import SleepLog from '../models/sleeplog';
import config from '../config.json';

const apiUrl = config.apiUrl;

class SleepLogController {

    static async getSleepLogs(user) {
        try {
            const response = await fetch(`${apiUrl}/sleeplogs/${user.userID}`)
            const data = await response.json();
            return data.map(log => SleepLog.fromJSON(log));
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }

    static async getSleepLogsLastSevenDays(user) {
        try {
            const response = await fetch(`${apiUrl}/sleeplogs/${user.userID}/lastsevendays`)
            const data = await response.json();
            return data.map(log => SleepLog.fromJSON(log));
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }

    static async getSleepLogsLastFourteenDays(user) {
        try {
            const response = await fetch(`${apiUrl}/sleeplogs/${user.userID}/lastfourteendays`)
            const data = await response.json();
            return data.map(log => SleepLog.fromJSON(log));
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }

    static async getSleepLogsByPeriod(user, startDate, endDate) {
        try {
            const response = await fetch(`${apiUrl}/sleeplogs/${user.userID}/byperiod`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
            });
            console.log(response);
            const data = await response.json();
            return data.map(log => SleepLog.fromJSON(log));
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }
}

export default SleepLogController;