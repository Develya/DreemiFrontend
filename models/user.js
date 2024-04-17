import config from '../config.json';
const apiUrl = config.apiUrl;

class User {
    constructor(userID, googleID, email, name, pictureURL) {
        this.userID = userID;
        this.googleId = googleID;
        this.email = email;
        this.name = name;
        this.pictureURL = pictureURL;
    }

    static fromJson(json) {
        return new User(
            json.userID,
            json.googleID,
            json.email,
            json.name,
            json.pictureURL
        );
    }

    async refreshData() { // Send a GET request to the backend to refresh the user's data
        try {
            await fetch(`${apiUrl}/sleeplogs/${this.userID}/refresh`)
            return 0;
        } catch (error) {
            console.error('Error refreshing user data:', error);
            return 1;
        }
    }
}

export default User;