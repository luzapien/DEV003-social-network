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

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const auth1 = getAuth(app);
onAuthStateChanged(auth1, (user) => {
  if (user) {
    onNavigate('/');
    console.log(user);
  } else {
    onNavigate('/login');
  }
});
