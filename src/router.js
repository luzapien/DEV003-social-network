const PATHS = {
  home: {
    path: '/',
    template: '<h1>Bienvenido</h1>',
  },
  about: {
    path: '/inicio',
    template: '<h1>👩🏻‍💻Inicio </h1>',
  },
};

class Router {
  constructor(paths) {
    this.paths = paths;
    this.initRouter();
  }

  initRouter() {
    const { location: { pathname = '/' } } = window;
    const URL = pathname === '/' ? 'home' : pathname.replace('/', '');
    this.load(URL);
  }

  load(page = 'home') {
    const { paths } = this;
    const { path, template } = paths[page] || paths.error;
    const $CONTAINER = document.querySelector('#root');
    $CONTAINER.innerHTML = template;
    window.history.pushState({}, 'done', path);
  }
}

// const routes = {
//   '/': { // Lo que está entre comillas son las llaves del pathname
//     template: './pages/home.html', // template, nos da el pathname del html, es un mecanismo para mantener el comtenido de html https://developer.mozilla.org/es/docs/Web/HTML/Element/template//
//   },
//   '/register': {
//     template: './pages/register.html',
//   },
//   '/login': {
//     template: './pages/login.html',
//   },
// };
// // El botón debe llamar a route a través de una función y mandando el nombre de la section.
// // en el route recibe la section y esa es la que le va a indicar ala constante route.

// async function handleLocation() {
//   const path = window.location.pathname; // '/', '/register', '/login'
//   const route = routes[path];// para acceder a esas propiedades del onjeto routes es mediante  []

//   if (route) {
//     const template = route.template;
//     const html = await fetch(template); // Investigar fetch https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch//
//     const htmlText = await html.text(); // text()función p/cnvertir la const html a texto//
//     const rootContainer = document.getElementById('root');
//     rootContainer.innerHTML = htmlText; // metemos el texto al "cascarón" en el index que creamos.
//   }
// }

// export async function handleRoute(route) {
//   window.history.pushState(undefined, '', route); // pushState necesita de parametros Data,un string y una ruta url
//   await handleLocation();
// }

// window.onpopstate = handleRoute(); // leer onpopstate https://developer.mozilla.org/es/docs/Web/API/Window/popstate_event//
// handleLocation();
