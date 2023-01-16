// Este es el punto de entrada de tu aplicacion
// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import firebaseConfig from './lib/index';

// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const btnGoogle = document.getElementById('btnGoogle');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// console.log(app);

btnGoogle.addEventListener('click', async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error);
  }
});

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', async () => {
  const auth = getAuth(app);
  const email = document.getElementById('txtMail').value;
  const password = document.getElementById('txtPass').value;
  console.log(email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  }
});
