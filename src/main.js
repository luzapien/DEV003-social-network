import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
// import { async } from 'regenerator-runtime';
import firebaseConfig from './lib/index';
// import { async } from 'regenerator-runtime';

// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const btnGoogle = document.getElementById('btnGoogle');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// console.log(app);
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
    console.log(user);
  } else {
    document.getElementById('scWelcome').style.display = 'none';
    document.getElementById('scAccess').style.display = 'block';
  }
});

btnGoogle.addEventListener('click', async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // console.log(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // console.log(error);
  }
});

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', async () => {
  // llamar funcion validar correo nuevo (correo, email)
  const auth = getAuth(app);
  const email = document.getElementById('txtMail').value;
  const password = document.getElementById('txtPass').value;
  //  console.log(email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
    // console.log(userCredential);
  } catch (error) {
    const errorCode = error.code;
    //  const errorMessage = error.message;

    console.log(errorCode);
    // auth/invalid-email

    if (error.code === 'auth/email-already-in-use') {
      alert('Ya hay un usuario registrado con el correo');
      // falta limpiar el correo y usuario
    } else if (error.code === 'auth/internal-error' || error.code === 'auth/invalid-email') {
      alert('Ingrese un correo valido');
    } else if (error.code === 'auth/weak-password') {
      alert('La contraseña debe tener minimo 6 caracteres');
    }
  }
});

const logout = document.getElementById('btnLogout');
logout.addEventListener('click', async () => {
  await signOut(auth);
  document.getElementById('scWelcome').style.display = 'none';
  document.getElementById('scAccess').style.display = 'block';
  console.log('sesion cerrada');
});

// btnLogin
const loginWithMail = document.getElementById('btnLogin');
loginWithMail.addEventListener('click', async () => {
  try {
    const auth = getAuth(app);
    const email = document.getElementById('txtMail').value;
    const password = document.getElementById('txtPass').value;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById('scWelcome').style.display = 'block';
    // alert(`Bienvenido ${auth}`)  ;
    alert(`Bienvenido${email}`);
    document.getElementById('scAccess').style.display = 'none';
  } catch (error) {
    console.log(error.code);
    if (error.code === 'auth/wrong-password') {
      alert('Contraseña incorrecta');
    } else if (error.code === 'auth/user-not-found') {
      alert('Correo no registrado');
    }
    // auth/wrong-password
  }
});
