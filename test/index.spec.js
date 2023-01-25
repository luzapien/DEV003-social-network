// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// import { isValidTimestamp } from '@firebase/util';
// import { /* loginWithGoogle, */ registerNewUser } from '../src/lib/firebase';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
// describe('loginWithGoogle', () => {
//   it('return google user', () => {
//     const result = loginWithGoogle()
//     expect(result.length).toBe(1);
//   });
// });
// describe('registerNewUser', () => {
//   it('return an user', () => {
//     // const name = 'Chris';
//     // const lastName = 'Olivos';
//     const email = 'test@gmail.com';
//     const password = '123456';
//     // const confirmPass = '123456';
//     const result = registerNewUser(email, password);
//     expect(result.email).toBe('test@gmail.com);
//   });
// });
//import { resultEmailLogin } from '../src/lib/__mock__/firebase';
import { emailLogin } from '../src/lib/firebase';

// jest.mock('firebase/auth');
jest.mock('../src/lib/firebase.js');

test('should return an email', async () => {
  const email = await emailLogin('catsLover@gmail.com', 123456);

  expect(email.email).toBe('catslover@gmail.com');
});
