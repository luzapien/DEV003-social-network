import { registerNewUser } from '../src/lib/firebase';
import { Register } from '../src/components/Register';

jest.mock('../src/lib/functions_post', () => ({
  createUserDoc: jest.fn(),
}));
jest.mock('../src/lib/firebase', () => ({
  registerNewUser: jest.fn(),
}));

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('Registro con contraseñas diferentes en imputs', () => {
  let inputName;
  let inputLastname;
  let inputEmail;
  let inputPassword;
  let inputConfirmPassword;
  let buttonRegister;

  beforeEach(() => {
    document.body.appendChild(Register());
    inputName = document.getElementById('nameId');
    inputLastname = document.getElementById('lastnameId');
    inputEmail = document.getElementById('emailId');
    inputPassword = document.getElementById('passwordId');
    inputConfirmPassword = document.getElementById('confirmPasswordId');
    buttonRegister = document.getElementById('buttonRegisterHome');
  });

  it('Debería mostrar un error', async () => {
    inputName.value = 'Chris';
    inputLastname.value = 'Olivos';
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '12345689';
    inputConfirmPassword.value = '12345612';
    buttonRegister.click();
    await tick();
    const textErrorModal = document.getElementById('textModalError');
    expect(textErrorModal.textContent).toBe('Las contraseñas no coinciden');
  });
});

describe('registro con un correo ya registrado', () => {
  let inputName;
  let inputLastname;
  let inputEmail;
  let inputPassword;
  let inputConfirmPassword;
  let buttonRegister;

  beforeEach(() => {
    document.body.appendChild(Register());
    inputName = document.getElementById('nameId');
    inputLastname = document.getElementById('lastnameId');
    inputEmail = document.getElementById('emailId');
    inputPassword = document.getElementById('passwordId');
    inputConfirmPassword = document.getElementById('confirmPasswordId');
    buttonRegister = document.getElementById('buttonRegisterHome');
  });

  it('Debería mostrar un error', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    registerNewUser.mockImplementationOnce(() => Promise.reject({ code: 'auth/email-already-in-use' }));
    const windowModal = document.getElementById('textErrorModal');
    windowModal.click();
    inputName.value = 'Chris';
    inputLastname.value = 'Olivos';
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '12345678';
    inputConfirmPassword.value = '12345678';
    buttonRegister.click();
    await tick();
    const textErrorModal2 = document.getElementById('textModalError');
    expect(textErrorModal2.textContent).toBe('Ya hay un usuario registrado con el correo');
  });
});

describe('registro con una contraseña debil', () => {
  let inputName;
  let inputLastname;
  let inputEmail;
  let inputPassword;
  let inputConfirmPassword;
  let buttonRegister;

  beforeEach(() => {
    document.body.appendChild(Register());
    inputName = document.getElementById('nameId');
    inputLastname = document.getElementById('lastnameId');
    inputEmail = document.getElementById('emailId');
    inputPassword = document.getElementById('passwordId');
    inputConfirmPassword = document.getElementById('confirmPasswordId');
    buttonRegister = document.getElementById('buttonRegisterHome');
  });

  it('Debería mostrar un error', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    registerNewUser.mockImplementationOnce(() => Promise.reject({ code: 'auth/weak-password' }));
    const windowModal = document.getElementById('textErrorModal');
    windowModal.click();
    inputName.value = 'Chris';
    inputLastname.value = 'Olivos';
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '12';
    inputConfirmPassword.value = '12';
    buttonRegister.click();
    await tick();
    const textErrorModal2 = document.getElementById('textModalError');
    expect(textErrorModal2.textContent).toBe('La contraseña debe tener minimo 6 caracteres');
  });
});
