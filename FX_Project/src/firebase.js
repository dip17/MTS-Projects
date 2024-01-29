import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { apiConstants } from "./components/Constant/constants";

var firebaseConfig = {
    apiKey: apiConstants.firebase_api_key,
    authDomain: apiConstants.firebase_auth_domain,
    projectId: apiConstants.firebase_project_id,
    storageBucket: apiConstants.firebase_storage_bucket,
    messagingSenderId: apiConstants.firebase_messaging_sender_id,
    appId: apiConstants.firebase_app_id,
    measurementId: apiConstants.firebase_measurement_id,
};

const publicKey = apiConstants.firbase_public_key;

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: publicKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

export const getFcmToken = async (setTokenFound) => {
    let currentToken = '';
    try {
        currentToken = await getToken(messaging, { vapidKey: publicKey })
        .then((currentToken) => {
            if (currentToken) {
                return currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })

        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
      console.log('An error occurred while retrieving token.', error);
    }
    return currentToken;
};

export const onMessageListener = () => {
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });
}