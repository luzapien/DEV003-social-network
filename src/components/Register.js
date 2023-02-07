import { registerNewUser, updateUserProfile } from '../lib/firebase';
import { onNavigate } from '../router';
import { createUserDoc } from '../lib/functions_post';

export const Register = () => {
  const container = document.createElement('div');
  container.className = 'container-register';
  const titleRegister = '<h1 class = \'title-register\'>Registrate</h1>';
  const form = document.createElement('form');
  form.className = 'form-register';
  const name = document.createElement('input');
  name.type = 'text';
  name.required = true;
  name.placeholder = 'Nombre';
  name.className = 'form-input';
  const lastname = document.createElement('input');
  lastname.type = 'text';
  lastname.required = true;
  lastname.placeholder = 'Apellido';
  lastname.className = 'form-input';
  const email = document.createElement('input');
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  email.className = 'form-input';
  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Contraseña';
  password.className = 'form-input';
  const passwordConfirm = document.createElement('input');
  passwordConfirm.type = 'password';
  passwordConfirm.placeholder = 'Confirmar contraseña';
  passwordConfirm.className = 'form-input';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordConfirmValue = passwordConfirm.value;
    const passwordValue = password.value;
    const nameValue = name.value;
    const lastnameValue = lastname.value;
    const fullName = `${nameValue} ${lastnameValue}`;

    if (passwordValue !== passwordConfirmValue) {
      alert('Las contraseñas no coinciden');
    } if (emailValue && passwordValue && nameValue && lastnameValue && passwordConfirmValue) {
      let errorCode;
      registerNewUser(emailValue, passwordValue).then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(user, fullName, 'http://placekitten.com/200/300').then(() => {
          createUserDoc(user);
          console.log(user.displayName);
        });
      }).catch((error) => {
        console.log(error);
        errorCode = error.code;
        let message;
        console.log(errorCode);
        if (errorCode) {
          if (errorCode === 'auth/email-already-in-use') {
            message = 'Ya hay un usuario registrado con el correo';
          } else if (errorCode === 'auth/internal-error' || errorCode === 'auth/invalid-email') {
            message = 'Ingrese un correo valido';
          } else if (errorCode === 'auth/weak-password') {
            message = 'La contraseña debe tener minimo 6 caracteres';
          } else if (errorCode === 'invalid-argument') {
            message = 'Algo salió mal';
          }
          alert(message);
        }
      });
      // try {
      //   const result = await registerNewUser(emailValue, passwordValue);
      //   const user = result.user;
      //   await updateUserProfile(user, fullName, 'http://placekitten.com/200/300');
      //   await createUserDoc(user);
      // } catch (error) {
      //   errorCode = error.code;
      // }
 
    }
  });

  const registerBtn = document.createElement('button');
  registerBtn.id = 'buttonRegisterHome';
  registerBtn.textContent = 'Registrar';
  registerBtn.type = 'submit';
  registerBtn.className = 'btns-register stylesBtns mt-20';

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Regresar al inicio de sesión';
  loginBtn.id = 'btn-return-login';
  loginBtn.type = 'button';
  loginBtn.className = 'btns-register stylesBtns';
  loginBtn.addEventListener('click', () => {
    onNavigate('/');
  });
  form.append(name, lastname, email, password, passwordConfirm, registerBtn, loginBtn);
  container.innerHTML = titleRegister;
  container.appendChild(form);

  return container;
};
