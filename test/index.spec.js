// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

import {
  registerNewUser, emailLogin, loginWithGoogle, logOutFunction,
} from '../src/lib/__mock__/firebase';

jest.mock('firebase/auth');

test('should return a  new register email', async () => {
  const email = await registerNewUser('Kitty, Miau, catslover@gmail.com, 123456');
  expect(email).toContain('catslover@gmail.com');
});

test('should return an email', async () => {
  const email = await emailLogin('catslover@hotmail.com, 123456');
  expect(email).toContain('catslover@hotmail.com');
});

test('should return a google email', async () => {
  const email = await loginWithGoogle('catslover@gmail.com, 123456');
  expect(email).toContain('catslover@gmail.com');
});

test('should dont return an email', async () => {
  const email = await logOutFunction('');
  expect(email).toBe('');
});
