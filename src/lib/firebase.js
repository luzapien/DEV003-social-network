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
import { firebaseConfig } from './configFirebase.js';
import { onNavigate } from '../router';

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export function informationUser() {
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    // const email = user.email;
    // const photoURL = user.photoURL;
    return user;
  }
  console.log('Aun no hay usuario');
}

/* export function getCurrentUser() {
  return auth.currentUser;
} */

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
export function logOutFunction() {
  return signOut(auth);
}

export function emailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function registerNewUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const updateUserProfile = (user, displayName, userPhoto) => {
  const userProperties = {
    displayName,
    photoURL: userPhoto,
  };
  return updateProfile(user, userProperties);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/home');
  } else {
    onNavigate('/');
  }
});
