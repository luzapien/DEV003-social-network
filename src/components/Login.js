import { emailLogin, loginWithGoogle } from '../lib/firebase';
// import { userCollectionGoogle } from '../lib/functions_post';
import { createUserDoc } from '../lib/functions_post';
import { onNavigate } from '../router';

export const Login = () => {
  document.title = 'Login';
  const container = document.createElement('section');
  container.className = 'mainContainer';
  const title = '<h1 class = "title-page">CatsLover</h1>';
  const form = document.createElement('form');
  form.className = 'form-login';
  const email = document.createElement('input');
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  email.className = 'form-input';
  const password = document.createElement('input');
  password.type = 'password';
  password.placeholder = 'Contraseña';
  password.minLength = 6;
  password.className = 'form-input';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    if (emailValue && passwordValue) {
      try {
        // const email =
        await emailLogin(emailValue, passwordValue);
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
  });
  // Botones inicio y registrar
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Iniciar Sesión';
  btnLogin.id = 'buttonLogin';
  btnLogin.type = 'submit';
  btnLogin.className = 'btn-login stylesBtns mt-20';
  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Registrar';
  btnRegister.id = 'buttonRegister';
  btnRegister.className = 'btn-register stylesBtns';
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  const btnGoogle = document.createElement('button');
  btnGoogle.id = 'buttonGoogle';
  btnGoogle.className = 'btnGoogle stylesBtns';
  btnGoogle.textContent = 'Entrar con Google';
  btnGoogle.addEventListener('click', async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      await createUserDoc(user);
    } catch (error) {
      console.log(error);
    }
  });

  form.append(email, password, btnLogin);
  container.innerHTML = title;
  container.append(form, btnGoogle, btnRegister);

  return container;
};
