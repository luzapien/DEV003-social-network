import { emailLogin, loginWithGoogle } from '../lib/firebase';
// import { userCollectionGoogle } from '../lib/functions_post';
import { onNavigate } from '../router';

export const Login = () => {
  document.title = 'Login';
  const container = document.createElement('section');
  container.className = 'mainContainer';
  const title = '<h1 class = "title-page">CatLovers</h1>';
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
       const email= await emailLogin(emailValue, passwordValue);
       const email2 = email.user.email;
      // console.log(email2);
   //   userCollectionGoogle(email2);
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
  });
  // Botones inicio y registrar
  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Iniciar Sesión';
  btnLogin.type = 'submit';
  btnLogin.className = 'btn-login stylesBtns mt-20';
  const btnRegister = document.createElement('button');
  btnRegister.textContent = 'Registrar';
  btnRegister.className = 'btn-register stylesBtns';
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  const btnGoogle = document.createElement('button');
  btnGoogle.className = 'btnGoogle stylesBtns';
  btnGoogle.textContent = 'Entrar con Google';
  btnGoogle.addEventListener('click', async () => {
    try {
      const emailUser = await loginWithGoogle();
      const emailCollection = emailUser.user.email;
    //  console.log(emailUser.user.email);
   //   userCollectionGoogle(emailCollection);
    // onNavigate('/');
    } catch (error) {
      console.log(error);
    }
  });


  form.append(email, password, btnLogin, btnGoogle, btnRegister);
  container.innerHTML = title;
  container.appendChild(form);


  return container;
};
