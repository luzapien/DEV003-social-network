// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// eslint-disable-next-line import/no-unresolved
import { /* render, */ screen, fireEvent } from '@testing-library/react';
import { emailLogin } from '../src/lib/firebase';

import {
  registerNewUser, emailLogin1, loginWithGoogle, logOutFunction,
} from '../src/lib/__mock__/firebase';

jest.mock('firebase/auth');

test('should return a  new register email', async () => {
  const email = await registerNewUser('Kitty, Miau, catslover@gmail.com, 123456');
  expect(email).toContain('catslover@gmail.com');
});

test('should return an email', async () => {
  const email = await emailLogin1('catslover@hotmail.com, 123456');
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

/** ***********Boton Login*************** */
test('should get user correct', () => {
  // const sut= render(<button />);
// btnLoginWithEmail= sut.getByTestId('buttonLogin');
  const buttonLogin = screen.getByRole('button', { name: 'Iniciar Sesión' });
  fireEvent.click(buttonLogin);
  expect(emailLogin).toHaveBeenCalled();
/* it('boton login', () => {
  // onNavigate('/register');
  const buttonLogin = new emailLogin();
  expect(buttonLogin).toHaveBeenCalledTimes(1); */
});
