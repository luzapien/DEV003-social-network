import {
  registerNewUser,
} from '../src/lib/firebase';

jest.mock('@firebase/auth', () => (
  {
    createUserWithEmailAndPassword: () => Promise.resolve({ currentUser: 'string' }),
    updateProfile: () => ({}),
    getAuth: () => ({ currentUser: 'string' }),
    signInWithEmailAndPassword: () => Promise.resolve({ user: 'string' }),
    GoogleAuthProvider: class {},
    signInWithPopup: () => Promise.resolve({ user: 'stringGoogle' }),
  }
));

jest.mock('../src/lib/firebase');
test('should return a user', () => {
  const newUser = registerNewUser('maria@gmail.com', '123456');
  expect(newUser[0]).toEqual('maria@gmail.com');
  // expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

// test('should return a  new register email', async () => {
//   const email = await registerNewUser('Kitty, Miau, catslover@gmail.com, 123456');
//   expect(email).toContain('catslover@gmail.com');
// });

// test('should return an email', async () => {
//   const email = await emailLogin1('catslover@hotmail.com, 123456');
//   expect(email).toContain('catslover@hotmail.com');
// });

// test('should return a google email', async () => {
//   const email = await loginWithGoogle('catslover@gmail.com, 123456');
//   expect(email).toContain('catslover@gmail.com');
// });

// test('should dont return an email', async () => {
//   const email = await logOutFunction('');
//   expect(email).toBe('');
// });

// /** ***********Boton Login*************** */
// test('should get user correct', () => {
//   // const sut= render(<button />);
// // btnLoginWithEmail= sut.getByTestId('buttonLogin');

//   const buttonLogin = screen.getByRole('button', { name: 'Iniciar Sesión' });
//   fireEvent.click(buttonLogin);
//   expect(emailLogin).toHaveBeenCalled();
// /* it('boton login', () => {
//   // onNavigate('/register');
//   const buttonLogin = new emailLogin();
//   expect(buttonLogin).toHaveBeenCalledTimes(1); */
// });
