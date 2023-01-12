// Este es el punto de entrada de tu aplicacion
// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { myFunction } from './lib/index.js';
// const analytics = getAnalytics(app);

// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsV641BeYPAlGnaSM_CPuV5nWGVNOiPZs',
  authDomain: 'catslover012023.firebaseapp.com',
  databaseURL: 'https://catslover012023-default-rtdb.firebaseio.com',
  projectId: 'catslover012023',
  storageBucket: 'catslover012023.appspot.com',
  messagingSenderId: '262132831591',
  appId: '1:262132831591:web:12a097d59110e034244bc2',
  measurementId: 'G-K4QCS1CZVP',
};
const btnGoogle = document.getElementById('btnGoogle');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

btnGoogle.addEventListener('click', () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
});

const auth = getAuth(app);

myFunction();
