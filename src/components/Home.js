// eslint-disable-next-line import/no-cycle
import { loginWithGoogle } from '../lib/firebase';
import { onNavigate } from '../router';

export const Home = () => {
  const container = document.createElement('section');
  container.className = 'mainContainer'; 
  const btnGoogle = document.createElement('button');
  btnGoogle.innerText = 'Sign in with Google';
  // Creación de form
  const homeDiv = document.createElement('div');
  const form = document.createElement('form');
  const label = document.createElement('label');
  const name = document.createElement('input');
  name.setAttribute('type', 'text');
  name.setAttribute('placeholder', 'Correo');
  const password = document.createElement('input');
  password.setAttribute('type', 'password');
  password.setAttribute('placeholder', 'Contraseña');
  const btnRegister = document.createElement('button');
  const btnLogin = document.createElement('button');
  btnGoogle.addEventListener('click', async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result.user);
      onNavigate('/');
    } catch (error) {
      console.log(error);
    }
  });
  // Botones inicio y registrar
  btnRegister.textContent = 'Registrate';
  btnLogin.textContent = 'Inicia Sesión';
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });
  homeDiv.appendChild(form);
  form.appendChild(label);
  label.append(name, password);
  homeDiv.appendChild(btnRegister);
  homeDiv.appendChild(btnLogin);
  homeDiv.appendChild(container);
  container.appendChild(btnGoogle);

  return homeDiv;
};

// export const Login = () => {
//   const container = document.createElement('section');
//   container.className = 'mainContainer';

//   const btnGoogle = document.createElement('button');
//   btnGoogle.innerText = 'Sign in with Google';
//   btnGoogle.addEventListener('click', async () => {
//     try {
//       const result = await loginWithGoogle();
//       console.log(result.user);
//       onNavigate('/');
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   container.appendChild(btnGoogle);

//   return container;
// };
