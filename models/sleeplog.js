class SleepLog {
    constructor(logID, duration_ms, startDate, endDate, efficiency, userID) {
        this.logID = logID;
        this.duration_ms = duration_ms;
        this.startDate = startDate;
        this.endDate = endDate;
        this.efficiency = efficiency;
        this.userID = userID;
    }

    static fromJSON(json) {
        return new SleepLog(json.logID, json.duration_ms, json.startDate, json.endDate, json.efficiency, json.userID);
    }

    durationInHours() {
        return Number((((this.duration_ms / 1000) / 60) / 60).toFixed(1));
    }

    formattedEndDate() {
        const date = new Date(this.endDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day < 10 ? `0${day}`: day}/${month < 10 ? `0${month}`: day}`;
    }

    formattedEndDateLong() {
        const date = new Date(this.endDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day < 10 ? `0${day}`: day}/${month < 10 ? `0${month}`: day}/${date.getFullYear()}`;
    }
}

export default SleepLog;