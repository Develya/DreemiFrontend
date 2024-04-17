import User from '../models/user';
import config from '../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = config.apiUrl;

class UserController {
    static async googleSignIn(idToken) {
        try {
            // Send a POST request to the backend to sign in with Google
            const response = await fetch(`${apiUrl}/users/googleSignIn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ authorizationToken: idToken })
            });
            // Get the user's data from the backend and store it in AsyncStorage
            const userJson = await response.json();
            const user = User.fromJson(userJson);
            AsyncStorage.setItem('@user', JSON.stringify(user));
            
            return 0;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            return 1;
        }
    }

    static async logout() {
        try {
            await AsyncStorage.removeItem('@user');
            return 0;
        } catch (error) {
            console.error('Error signing out:', error);
            return 1;
        }
    }

    static async authorizeFitbit(code, codeVerifier) {
        try {
            const user = await UserController.getUser();

            if (user !== null) {
                await fetch(`${apiUrl}/fitbitauths/fitbitSignIn`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ authCode: code, codeVerifier: codeVerifier, userId: user.userID})
                })
                return 0;
            }
        } catch (error) {
            console.error('Error authorizing Fitbit:', error);
            return 1;
        }
    }

    static async getUser() {
        try {
            // Check if user is logged in from AsyncStorage
            const value = await AsyncStorage.getItem('@user');
            if (value !== null) {
                return User.fromJson(JSON.parse(value)); // Yes
            } else {
                return null; // No
            }
        } catch (error) {
            console.log('Error fetching user:', error);
            return null;
        }
    }
}

export default UserController;