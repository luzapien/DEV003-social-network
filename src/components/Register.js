export const Register = () => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Registrate';
  const btnHome = document.createElement('button');

  btnHome.textContent = 'Cerrar Sesión';

  homeDiv.appendChild(btnHome);

  return homeDiv;
};
