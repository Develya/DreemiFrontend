import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import UserController from '../controllers/userController';
import secrets from '../secrets';

import config from '../config.json';
const primaryColor = config.primaryColor;

/* Google auth */
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
/* Client IDs Google Cloud */
const androidClientId = secrets.androidClientIdGoogle;
const webClientId = secrets.webClientIdGoogle;

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    
    // Setup Google sign in prompt
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
        webClientId: webClientId
    });

    // Triggered when a response is received from Google
    React.useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    const handleSignInWithGoogle = async () => {
        switch(response?.type) {
            case 'success': // If successful, sign in with Google
                await UserController.googleSignIn(response.authentication.idToken);
                await navigation.replace('FitbitPermission'); // TODO: Verify if Fitbit already authorized
                break;

            case 'error':
                setErrorMessage(`There was an error logging in with Google. Please try again later.`);
                setError(true);
                break;

            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            {
                error && <Text style={{color:'#ff0000'}}>{errorMessage}</Text>
            }
            <Button title='Login with Google' onPress={() => promptAsync()} color={primaryColor}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;