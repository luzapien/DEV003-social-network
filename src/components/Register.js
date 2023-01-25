import { registerNewUser, updateUserProfile } from '../lib/firebase';
import { onNavigate } from '../router';

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
  const lastname = document.createElement('input');
  lastname.type = 'text';
  lastname.required = true;
  lastname.placeholder = 'Apellido';
  const email = document.createElement('input');
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Contraseña';
  const passwordConfirm = document.createElement('input');
  passwordConfirm.type = 'password';
  passwordConfirm.placeholder = 'Confirmar contraseña';

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
      return;
    }

    if (emailValue && passwordValue && nameValue && lastnameValue && passwordConfirmValue) {
      let errorCode;
      try {
        const result = await registerNewUser(emailValue, passwordValue);
        const user = result.user;
        await updateUserProfile(user, fullName, 'http://placekitten.com/200/300');
        onNavigate('/');
      } catch (error) {
        errorCode = error.code;
      }
      let message;
      console.log(errorCode);
      if (errorCode) {
        if (errorCode === 'auth/email-already-in-use') {
          message = 'Ya hay un usuario registrado con el correo';
        } else if (errorCode === 'auth/internal-error' || errorCode === 'auth/invalid-email') {
          message = 'Ingrese un correo valido';
        } else if (errorCode === 'auth/weak-password') {
          message = 'La contraseña debe tener minimo 6 caracteres';
        }
        alert(message);
      }
    }
  });

  const registerBtn = document.createElement('button');
  registerBtn.textContent = 'Registrar';
  registerBtn.type = 'submit';
  registerBtn.className = 'btns-register stylesBtns';

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Regresar al inicio de sesión';
  loginBtn.type = 'button';
  loginBtn.className = 'btns-register stylesBtns';
  loginBtn.setAttribute('id', 'btn-return-login');
  loginBtn.addEventListener('click', () => {
    onNavigate('/login');
  });
  form.append(name, lastname, email, password, passwordConfirm);
  form.appendChild(registerBtn);
  container.innerHTML = titleRegister;
  container.appendChild(form);
  container.append(loginBtn);

  return container;
};
