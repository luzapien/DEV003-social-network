import { logOutFunction } from '../lib/firebase';
import { onNavigate } from '../router';

export const Home = () => {
  document.title = 'Home';
  const title = document.createElement('h1');
  title.innerText = 'Home';
  const container = document.createElement('section');
  container.className = 'mainContainer';
  const signOutBtn = document.createElement('button');
  signOutBtn.type = 'button';
  signOutBtn.innerText = 'Cerrar sesión';
  signOutBtn.addEventListener('click', async () => {
    try {
      await logOutFunction();
      onNavigate('/login');
    } catch (error) {
      console.log(error);
    }
  });

  container.appendChild(title);
  container.appendChild(signOutBtn);

  return container;
};