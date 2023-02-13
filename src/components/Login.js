// import { loginWithGoogle } from '../lib/firebase';
// import { userCollectionGoogle } from '../lib/functions_post';
// import { createUserDoc } from '../lib/functions_post';
import { onNavigate } from '../router';
import { validationloginWithMail, validationLoginWithGoogle } from '../main';

export const Login = () => {
  document.title = 'Login';
  const container = document.createElement('section');
  container.id = 'containerLogin';
  container.className = 'mainContainer';
  const title = document.createElement('img');
  title.src = 'https://i.postimg.cc/9FgZx0M0/Cats.png';
  const form = document.createElement('form');
  form.id = 'formLogin';
  form.className = 'form-login';
  const email = document.createElement('input');
  email.id = 'inputEmail';
  email.type = 'email';
  email.required = true;
  email.placeholder = 'Correo';
  email.className = 'form-input';
  email.id = 'inputEmailLogin';
  const password = document.createElement('input');
  password.id = 'inputPassword';
  password.type = 'password';
  password.required = true;
  password.placeholder = 'Contraseña';
  password.minLength = 6;
  password.className = 'form-input';
  password.id = 'inputPasswordLogin';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    validationloginWithMail(emailValue, passwordValue).then((r) => console.log(r));
  });

  // Botones inicio y registrar
  const btnLogin = document.createElement('button');
  btnLogin.id = 'buttonLogin';
  btnLogin.textContent = 'Iniciar Sesión';
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
  const googleImage = document.createElement('img');
  googleImage.className = 'google-image';
  googleImage.src = '../Images/login_google.png';
  btnGoogle.appendChild(googleImage);
  btnGoogle.addEventListener('click', () => {
    validationLoginWithGoogle();
  });

  form.append(email, password, btnLogin);
  container.appendChild(title);
  container.append(form, btnGoogle, btnRegister);
  return container;
};
