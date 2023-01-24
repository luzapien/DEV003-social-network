// aqui exportaras las funciones que necesites
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { onNavigate } from '../router';

// import { checkStateUser } from '../main';

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

export function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
}
export function logOutFunction() {
  const auth = getAuth();
  return signOut(auth);
}

export function emailLogin(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
  // let message;
  // try {
  //   const auth = getAuth(app);
  //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //   message = `Bienvenido ${email}`;
  //   return message;
  // } catch (error) {
  //   console.log(error.code);
  //   if (error.code === 'auth/wrong-password') {
  //     message = 'Contraseña incorrecta';
  //   } if (error.code === 'auth/user-not-found') {
  //     message = 'Correo no registrado';
  //   } if (error.code === 'auth/invalid-email') {
  //     message = 'Correo invalido';
  //   }
  //   return message;
  // }

  // auth/wrong-password
}

export function registerNewUser(email, password) {
  const auth = getAuth(app);
  const valor = createUserWithEmailAndPassword(auth, email, password);
  console.log(valor.email);
  return createUserWithEmailAndPassword(auth, email, password);
  //  console.log(email, password);
  // let message;

  // try {
  //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //   // console.log(userCredential);
  // } catch (error) {
  //   // const errorCode = error.code;
  //   //  const errorMessage = error.message;

  //   console.log(error.code);
  //   // auth/invalid-email

  //   if (error.code === 'auth/email-already-in-use') {
  //     message = 'Ya hay un usuario registrado con el correo';
  //     // falta limpiar el correo y usuario
  //   } else if (error.code === 'auth/internal-error' || error.code === 'auth/invalid-email') {
  //     message = 'Ingrese un correo valido';
  //   } else if (error.code === 'auth/weak-password') {
  //     message = 'La contraseña debe tener minimo 6 caracteres';
  //   }
  //   return message;
  // }
}

export const updateUserProfile = (user, displayName, userPhoto) => {
  const userProperties = {
    displayName,
    photoURL: userPhoto,
  };

  return updateProfile(user, userProperties);
};

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/');
    console.log(user);
  } else {
    onNavigate('/login');
  }
});
