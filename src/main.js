// Este es el punto de entrada de tu aplicacion
// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './lib/index';
// import { getAnalytics } from 'firebase/analytics';
// import { myFunction } from './lib/index.js';

// const analytics = getAnalytics(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const btnGoogle = document.getElementById('btnGoogle');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//console.log(app);

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
// console.log(document.cookie);
// myFunction();

const btnLogoutGoogle = document.getElementById('btnLogoutGoogle');
btnLogoutGoogle.addEventListener('click', () => {
  auth.signOut();
  console.log('cerraste sesion');
  console.log(auth);
  console.log(document.cookie);
});



const btnNewUser = document.getElementById('btnNewUser');
btnNewUser.addEventListener('click', () => {
  const newMail = document.getElementById('txtMail').value;
  const newPassword = document.getElementById('txtPass').value;
  console.log(newMail);
});
