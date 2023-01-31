import './router';
import { emailLogin, loginWithGoogle } from './lib/firebase';
import { createUserDoc } from './lib/functions_post';

/* =======Funciones para login======== */

/* Funcion para boton de logín con email */
export async function validationloginWithMail(email, password) {
  if (email && password) {
    try {
      // const email =
      await emailLogin(email, password);
    //  const email2 = email.user.email;
    } catch (error) {
      let message = 'Algo salió mal';

      if (error.code === 'auth/wrong-password') {
        message = 'Contraseña incorrecta';
      } if (error.code === 'auth/user-not-found') {
        message = 'Correo no registrado';
      } if (error.code === 'auth/invalid-email') {
        message = 'Correo invalido';
      }
      alert(message);
    }
  }
}
/* Función para boton de login con google */
export async function validationLoginWithGoogle() {
  try {
    const result = await loginWithGoogle();
    const user = result.user;
    await createUserDoc(user);
  } catch (error) {
    console.log(error);
  }
}

/* =======Funciones para register======== */
