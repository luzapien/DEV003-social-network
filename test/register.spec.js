import { registerNewUser } from '../src/lib/firebase';
import { Register } from '../src/components/Register';
import { createUserDoc } from '../src/lib/functions_post';

// const user = { user: { uid: 1234, nombre: "juan" } };
const message = 'auth/email-already-in-use';

jest.mock('../src/lib/functions_post', () => ({
  createUserDoc: jest.fn(),
}));
jest.mock('../src/lib/firebase', () => ({
  registerNewUser: jest.fn(),
}));
// createUserWithEmailAndPassword(auth, email, password);

// jest.spyOn(window, 'alert').mockImplementation((alerta) => { 'auth/email-already-in-use'; });

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('first Test for Register', () => {
  let viewContainer;
  let form;
  let inputName;
  let inputLastname;
  let inputEmail;
  let inputPassword;
  let inputConfirmPassword;
  let buttonRegister;
  let buttonReturnLogin;
  let textModalError;

  beforeEach(() => {
    document.body.appendChild(Register());
    viewContainer = document.getElementById('containerRegister');
    form = document.getElementById('formRegister');
    inputName = document.getElementById('nameId');
    inputLastname = document.getElementById('lastnameId');
    inputEmail = document.getElementById('emailId');
    inputPassword = document.getElementById('passwordId');
    inputConfirmPassword = document.getElementById('confirmPasswordId');
    buttonRegister = document.getElementById('buttonRegisterHome');
    buttonReturnLogin = document.getElementById('btn-return-login');
    textModalError = document.getElementById('textModalError');
  });

  it('Error: ya existe ese correo registrado', async () => {
    registerNewUser.mockImplementationOnce(() => Promise.reject(
      // email = 'chris@gmail.com'
      // password ='123456'
      // Promise.reject({ code: '23505' });    });
      new Error('Ya hay un usuario registrado con el correo'),
    ));

    inputName.value = 'Chris';
    inputLastname.value = 'Olivos';
    inputEmail.value = 'chris@gmail.com';
    inputPassword.value = '123456';
    inputConfirmPassword.value = '123456';
    form.submit();
    await tick();

    console.log('Message:', textModalError);

    expect(textModalError).toBe('Ya hay un usuario registrado con el correo');
    // expect(registerNewUser()).Error('Ya hay un usuario registrado con el correo');
  });
});

// it('Debería mostrar un error', async () => {
//   register.mockImplementationOnce((email, password) => {
//     return Promise.reject(
//       new Error('Firebase: Error (auth/invalid-email).'),
//     );
//   });

//   inputForSend.click();
//       await tick();
//   expect(errorMessage.innerHTML).toBe(
//     'Firebase: Error (auth/invalid-email).'
//   );
// });

// it('Debería mostrar un error', async () => {
//   registerNewUser.mockImplementationOnce((email, password) => Promise.reject(
//     new Error(email, password),
//   ));
//   inputEmail.value = 'emailverify.com';
//   inputPassword.value = '123456';
//   buttonRegister.click();
//   await tick();
//   expect(window.alert).toBeCalled();
// });
// est.spyOn(window, 'alert').mockImplementation(() => {});
// const TestModule = require('../module');
// describe('Mock window property', () => {
//   it('should mock window alert function', () => {
//     Object.defineProperty(global, 'window', {
//       value: {
//         alert: jest.fn(),
//       },
//     });
//     TestModule.notification();
//     expect(window.alert).toBeCalled();
//   });
// });

// it('Debería mostrar exito', async () => {
//   registerNewUser.mockImplementationOnce((email, password) => Promise.resolve({
//     user: { email, password },
//   }));

//   inputEmail.value = 'email@verify.com';
//   inputPassword.value = '123456';

//   buttonRegister.click();
//   await tick();
//   buttonRegister.dispatchEvent(new Event('click'));
//   expect(registerNewUser).toHaveBeenCalled();
// });
