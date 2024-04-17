import SleepLog from '../models/sleeplog';
import config from '../config.json';

const apiUrl = config.apiUrl;

class SleepLogController {
    static async getAllSleepLogs(user) {
        try {
            const response = await fetch(`${apiUrl}/sleeplogs/${user.userID}/lastsevendays`)
            const data = await response.json();
            return data.map(log => SleepLog.fromJSON(log));
        } catch (error) {
            console.error('Error fetching sleep logs:', error);
        }
    }
}

export default SleepLogController;