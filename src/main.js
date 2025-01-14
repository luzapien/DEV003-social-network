import './router';
import { emailLogin, loginWithGoogle } from './lib/firebase';
import { createUserDoc } from './lib/functions_post';
import { modalError } from './components/ModalError';

/* =======Funciones para login======== */

/* Funcion para boton de logín con email */
export function validationloginWithMail(email, password) {
  if (email && password) {
    const promise = emailLogin(email, password);
    return promise.then(() => {
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
      const mainContainer = document.querySelector('.mainContainer');
      mainContainer.appendChild(modalError(message));
      const windowModal = document.getElementById('textErrorModal');
      windowModal.addEventListener('click', () => {
        mainContainer.removeChild(windowModal);
      });

      return message;
    });
  // eslint-disable-next-line no-undef
  } return message;
}

export function validationLoginWithGoogle() {
  loginWithGoogle().then((result) => {
    const user = result.user;
    createUserDoc(user, user.displayName, user.photoURL).then();
  }).catch((error) => {
    console.log(error);
  });
}
