import { emailLogin, loginWithGoogle } from '../lib/firebase';
import { onNavigate } from '../router';

export const Login = () => {
  document.title = 'Login';
  const container = document.createElement('section');
  container.className = 'mainContainer';
  const form = document.createElement('form');
  const label = document.createElement('label');
  const email = document.createElement('input');
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Contraseña';
  password.minLength = 6;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    if (emailValue && passwordValue) {
      try {
        const result = await emailLogin(emailValue, passwordValue);
        const user = result.user;
        onNavigate('/');
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
  })
  // Botones inicio y registrar
  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Registro';
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Inicia Sesión';
  btnLogin.type = 'submit';

  const btnGoogle = document.createElement('button');
  btnGoogle.innerText = 'Sign in with Google';
  btnGoogle.addEventListener('click', async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result);
      onNavigate('/');
    } catch (error) {
      console.log(error);
    }
  });

  label.append(email, password);
  form.appendChild(label);
  form.appendChild(btnLogin);
  container.appendChild(form);
  container.appendChild(btnRegister);
  container.appendChild(btnGoogle);

  return container;
};
