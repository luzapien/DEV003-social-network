import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Home,
  '/login': Login,
  '/register': Register,
};

export function onNavigate(pathname) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
}

const component = routes[window.location.pathname];
rootDiv.appendChild(component());
