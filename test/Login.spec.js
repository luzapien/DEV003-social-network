import { emailLogin } from '../src/lib/firebase';
// import { getUserFromFirestore } from '../src/lib/functions_post';
import { Login } from '../src/components/Login';
// import { Home } from '../src/components/Home';

jest.mock('../src/lib/functions_post', () => ({
  getUserFromFirestore: jest.fn(),
}));
jest.mock('../src/lib/firebase', () => ({
  emailLogin: jest.fn(),
  informationUser: jest.fn(() => Promise.resolve({
    user: {
      uid: 'f4d54f46d4fd4646f',
    },
  })),
}));

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('Login con contraseña incorrecta', () => {
  let inputEmail;
  let inputPassword;
  let buttonLogin;

  beforeEach(() => {
    document.body.appendChild(Login());
    inputEmail = document.getElementById('inputEmailLogin');
    inputPassword = document.getElementById('inputPasswordLogin');
    buttonLogin = document.getElementById('buttonLogin');
  });

  it('Debería mostrar error de contraseña', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    emailLogin.mockImplementationOnce(() => Promise.reject({ code: 'auth/wrong-password' }));
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '1234568945646546';
    buttonLogin.click();
    await tick();
    const textErrorModal = document.getElementById('textModalError');
    expect(textErrorModal.textContent).toBe('Contraseña incorrecta');
  });
});

describe('Login con correo no registrado', () => {
  let inputEmail;
  let inputPassword;
  let buttonLogin;

  beforeEach(() => {
    document.body.appendChild(Login());
    inputEmail = document.getElementById('inputEmailLogin');
    inputPassword = document.getElementById('inputPasswordLogin');
    buttonLogin = document.getElementById('buttonLogin');
  });

  it('Debería mostrar error de correo no registrado', async () => {
    const windowModal = document.getElementById('textErrorModal');
    windowModal.click();
    // eslint-disable-next-line prefer-promise-reject-errors
    emailLogin.mockImplementationOnce(() => Promise.reject({ code: 'auth/user-not-found' }));
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '123456';
    buttonLogin.click();
    await tick();
    const textErrorModal = document.getElementById('textModalError');
    expect(textErrorModal.textContent).toBe('Correo no registrado');
  });
});
