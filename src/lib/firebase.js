// aqui exportaras las funciones que necesites
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// import { getFirestore, getDocs, collection } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { checkStateUser } from '../main';

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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
// console.log(db);

export async function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    return result.user;
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.customData.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
    return error;
  }
}
export function logOutFunction() {
  const auth = getAuth();
  signOut(auth);
}

export async function emailLogin(email, password) {
  let message;
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    message = `Bienvenido ${email}`;
    return message;
  } catch (error) {
    console.log(error.code);
    if (error.code === 'auth/wrong-password') {
      message = 'Contraseña incorrecta';
    } if (error.code === 'auth/user-not-found') {
      message = 'Correo no registrado';
    } if (error.code === 'auth/invalid-email') {
      message = 'Correo invalido';
    }
    return message;
  }

  // auth/wrong-password
}

export async function registerNewUser(email, password) {
  //  console.log(email, password);
  let message;
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(userCredential);
    message = userCredential;
  } catch (error) {
    // const errorCode = error.code;
    //  const errorMessage = error.message;
  //  message = error.code;
    console.log(error.code);
    // auth/invalid-email

    if (error.code === 'auth/email-already-in-use') {
      message = 'Ya hay un usuario registrado con el correo';
    // falta limpiar el correo y usuario
    } else if (error.code === 'auth/internal-error' || error.code === 'auth/invalid-email') {
      message = 'Ingrese un correo valido';
    } else if (error.code === 'auth/weak-password') {
      message = 'La contraseña debe tener minimo 6 caracteres';
    }
  } return message;
}
const auth = getAuth(app);
onAuthStateChanged(auth, async (user) => {
  checkStateUser(user);
  console.log(user);
});
