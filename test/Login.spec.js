// configurando firebase mock
import { validationloginWithMail, validationLoginWithGoogle } from '../src/main';

jest.mock('../src/main', () => ({
  validationloginWithMail: jest.fn(() => ({ email: 'chris@hotmail.com', password: '123456' })),
  validationLoginWithGoogle: jest.fn(() => ({ email: 'chris@gmail.com', password: '123456' })),
}));

const email = 'chris@gmail.com';
const password = '123456';
describe('Debería poder iniciar Sesión', () => {
  it('Sesión con Google', () => validationLoginWithGoogle(email, password).then((data) => {
    console.log('data', data);
    expect(data).toBe('chris@gmail.com');
  }));
//   it('Ingresar con Google', () => validationLoginWithGoogle(email, password)
//     .then((user) => {
//       console.log(user);
//       expect(user.email).to('chris@gmail.com');
//     }));
});

// describe('Register User with email', () => {
//   it('Debería poder registrarse', () => validationloginWithMail('chris@hotmail.com', '123456')
//     .then((user) => {
//       console.log('mail', user);
//       // expect(user.email).toBe('chris@gmail.com');
//       expect(user).toContaint('@');
//     }));
// });
