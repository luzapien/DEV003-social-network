import { emailLogin, loginWithGoogle } from '../lib/firebase';
import { onNavigate } from '../router';

export const Login = () => {
  document.title = 'Login';
  const container = document.createElement('section');
  container.className = 'mainContainer';
  const title = '<h1 class = "title-page">CatLovers</h1>';
  const form = document.createElement('form');
  form.className = 'form-login';
  const label = document.createElement('label');
  label.className = 'label-login';
  const email = document.createElement('input');
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  email.className = 'input-login';
  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Contraseña';
  password.minLength = 6;
  password.className = 'input-login';

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
        console.log(message);
      }
    }
  });
  // Botones inicio y registrar
  const containerBtnsEnd = document.createElement('div');
  containerBtnsEnd.className = 'containerBtnsEnd';
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Iniciar Sesión';
  btnLogin.type = 'submit';
  btnLogin.className = 'btn-login';

  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Registrar';
  btnRegister.className = 'btn-register';
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  const btnGoogle = document.createElement('img');
  btnGoogle.className = 'btnGoogle';
  btnGoogle.src = 'images/googleBtn.png';
  btnGoogle.alt = 'Entrar con google';
  btnGoogle.width = '100%';
  btnGoogle.height = '100%';
  btnGoogle.addEventListener('click', async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result.user);
      onNavigate('/');
    } catch (error) {
      console.log(error);
    }
  });

  label.append(email, password);
  form.appendChild(label);
  form.appendChild(btnLogin);
  containerBtnsEnd.append(btnRegister, btnGoogle);
  container.innerHTML = title;
  container.appendChild(form);
  container.appendChild(containerBtnsEnd);

  return container;
};
