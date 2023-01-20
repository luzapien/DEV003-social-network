// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
// import {
//   loginWithGoogle, logOutFunction, emailLogin, registerNewUser,
// } from './lib/firebase';
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from './router';
// import { Home } from './components/Home';

// const regresarHome = Home(btnRegister){
import './router';

// }
// // function displayElement(user) {
// //   if (user) {
// //     document.getElementById('scWelcome').style.display = 'block';
// //     document.getElementById('scAccess').style.display = 'none';
// //     console.log(user);
// //   } else {
// //     document.getElementById('scWelcome').style.display = 'none';
// //     document.getElementById('scAccess').style.display = 'block';
// //   }
// // }
// const btnGoogle = document.getElementById('btnGoogle');
// btnGoogle.addEventListener('click', () => {
//   console.log('boton');
// });

// // btnGoogle.addEventListener('click', async () => {
// //   const user = await loginWithGoogle();
// //   handleRoute('/');
// //   console.log(user);
// // });

// const btnRegister = document.getElementById('btnRegister');
// btnRegister.addEventListener('click', async () => {
//   // llamar funcion validar correo nuevo (correo, email)
//   const email = document.getElementById('txtMail').value;
//   const password = document.getElementById('txtPass').value;
//   //  console.log(email, password);
//   // console.log(userCredential);
//   const resultNewUser = registerNewUser(email, password);
//   // console.log(resultNewUser);
//   if (!resultNewUser) {
//     document.getElementById('scWelcome').style.display = 'block';
//     document.getElementById('scAccess').style.display = 'none';
//   } else {
//     document.getElementById('scWelcome').style.display = 'none';
//     document.getElementById('scAccess').style.display = 'block';
//   }
// });

// const logout = document.getElementById('btnLogout');
// logout.addEventListener('click', async () => {
//   // await signOut(auth);
//   logOutFunction();
//   document.getElementById('scWelcome').style.display = 'none';
//   document.getElementById('scAccess').style.display = 'block';
//   console.log('sesion cerrada');
// });

// // btnLogin
// const loginWithMail = document.getElementById('btnLogin');
// loginWithMail.addEventListener('click', () => {
//   const email = document.getElementById('txtMail').value;
//   const password = document.getElementById('txtPass').value;
//   const dataReturn = emailLogin(email, password);

//   // Promise.resolve(dataReturn).then((value) => alert (value));
//   Promise.resolve(dataReturn).then((value) => {
//     // alert(value);
//     const value1 = value;
//     if (value1.indexOf('@')) {
//       document.getElementById('scWelcome').style.display = 'block';
//       document.getElementById('scAccess').style.display = 'none';
//     } else {
//       document.getElementById('scWelcome').style.display = 'none';
//       document.getElementById('scAccess').style.display = 'block';
//     }
//     // alert(value1);
//   });
// });
// export function checkStateUser(user) {
//   if (user) {
//     document.getElementById('scWelcome').style.display = 'block';
//     document.getElementById('scAccess').style.display = 'none';
//   } else {
//     document.getElementById('scWelcome').style.display = 'none';
//     document.getElementById('scAccess').style.display = 'block';
//   }
// }
