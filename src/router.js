import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Login,
  '/home': Home,
  '/register': Register,
};

export async function onNavigate(pathname) {
  const localPath = window.location.pathname;
  window.history.pushState(
    {},
    pathname,
    window.location.origin + localPath,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild( await routes[pathname]());
}

const component = routes[window.location.pathname] || routes['/'];

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname]());
};
rootDiv.appendChild(component());
