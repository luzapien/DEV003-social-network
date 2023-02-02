import './router';
import { emailLogin, loginWithGoogle } from './lib/firebase';
import { createUserDoc } from './lib/functions_post';

/* =======Funciones para login======== */

/* Funcion para boton de logín con email */
export async function validationloginWithMail(email, password) {
  if (email && password) {
    const promise = emailLogin(email, password);
    promise.then(() => {
      const message = 'Usuario logueado';
      console.log(message);
      return message;
    }).catch((error) => {
      let message = 'Algo salió mal';
      if (error.code === 'auth/wrong-password') {
        message = 'Contraseña incorrecta';
      } if (error.code === 'auth/user-not-found') {
        message = 'Correo no registrado';
      } if (error.code === 'auth/invalid-email') {
        message = 'Correo invalido';
      }
      alert(message);
      return message;
    });
  }
}

/* Función para boton de login con google */
export function validationLoginWithGoogle() {
  const result = loginWithGoogle();
  result.then((res) => {
    const user = res.user;
    console.log(user);
    createUserDoc(user);
  }).catch((error) => {
    console.log(error);
  });
}

/* =======Funciones para register======== */
