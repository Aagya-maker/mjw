import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'AIzaSyDpJoSJDK5FXtgahYa3PiRnUWUOjTKnceY',
    authDomain: 'login-2cc96.firebaseapp.com',
    projectId: 'login-2cc96',
    storageBucket: 'login-2cc96.appspot.com',
    messagingSenderId: '606066096118',
    appId: '1:606066096118:web:096ce03447f805339e39d7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googlelogin = document.getElementById('google-login-btn');
googlelogin.addEventListener('click', function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const user = result.user;
            console.log(user);
            window.location.href = './logged.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});
