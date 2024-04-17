import * as React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import config from '../config.json';
const primaryColor = config.primaryColor;

import secrets from '../secrets';
const fitbitClientId = secrets.fitbitClientId;

import UserController from '../controllers/userController';

WebBrowser.maybeCompleteAuthSession();

const FitbitPermission = ({ navigation }) => {

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    /*
    // TODO: Redirect URL handling
    const handleDeepLink = ({ url }) => {
        const { queryParams } = Linking.parse(url);
        const { code, state } = queryParams;
        // Proceed with any logic based on code and state
    };
    React.useEffect(() => {
        Linking.addEventListener('url', handleDeepLink);
        return () => {
            Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);
    /**/

    // Fitbit authorization prompt
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: fitbitClientId,
            scopes: ['sleep'],
            redirectUri: 'dev.paintilya.dreemi://fitbit-redirect',
        },
        {
            authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
            tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
            revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
        }
    );

    React.useEffect(() => {
        switch(response?.type) {
            case 'success': // If successful, sign in with Google
                UserController.authorizeFitbit(response.params.code, request.codeVerifier)
                navigation.replace('Dashboard');
                break;

            case 'error':
                setErrorMessage(`There was an error authorizing Fitbit. Please try again later.`);
                setError(true);
                break;

            default:
                break;
        }
    }, [response]);

    return (
        <View style={styles.container}>
        {
            error && <Text style={{color:'#ff0000'}}>{errorMessage}</Text>
        }
        <Button title='Authorize Fitbit' onPress={() => promptAsync()} color={primaryColor}/>
    </View>
        
    );
}

export default FitbitPermission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
