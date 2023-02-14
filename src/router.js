import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/EditProfile';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Login,
  '/home': Home,
  '/register': Register,
  '/profile': Profile,
};

export function onNavigate(pathname) {
  const localPath = window.location.pathname;
  console.log(localPath);
  console.log(pathname);
  window.history.pushState(
    {},
    pathname,
    window.location.origin + localPath,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
  // rootDiv.appendChild(routes[window.location.pathname]());
}

// const component = routes[window.location.pathname] || routes['/'];

// window.onpopstate = () => {
//   while (rootDiv.firstChild) {
//     rootDiv.removeChild(rootDiv.firstChild);
//   }
//   rootDiv.appendChild(routes[window.location.pathname]());
// };

// rootDiv.appendChild(component());

// import Home, { init as home } from './components/Home';
// import Login, { init as login } from './components/Login';
// import Register, { init as register } from './components/Register';

// const routes = {
//   Login: { components: Login, init: login },
//   Home: { viewcomponents: Home, init: home },
//   Register: { components: Register, init: register },
// };
// const component = routes[window.location.pathname] || routes['/'];

// export { routes };
// window.onpopstate = () => {
//   while (rootDiv.firstChild) {
//     rootDiv.removeChild(rootDiv.firstChild);
//   }
//   rootDiv.appendChild(routes[window.location.pathname]());
// };
// rootDiv.appendChild(component());
