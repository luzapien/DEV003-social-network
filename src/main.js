// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import {
  loginWithGoogle, logOutFunction, emailLogin, registerNewUser
} from './lib/firebase';

// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(app);

const btnGoogle = document.getElementById('btnGoogle');

export function displayElement(user) {
  if (user) {
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
    console.log(user);
  } else {
    document.getElementById('scWelcome').style.display = 'none';
    document.getElementById('scAccess').style.display = 'block';
    console.log ("no hay un usuario");
  }
}

btnGoogle.addEventListener('click', async () => {
  const user = await loginWithGoogle();
});

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', async () => {
  // llamar funcion validar correo nuevo (correo, email)
  const email = document.getElementById('txtMail').value;
  const password = document.getElementById('txtPass').value;
  const resultNewUser = registerNewUser(email, password);
  /*if (!resultNewUser) {
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
  } else {
    document.getElementById('scWelcome').style.display = 'none';
    document.getElementById('scAccess').style.display = 'block';
  }*/
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
