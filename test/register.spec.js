import register from '../src/components/Register';
import { registerNewUser } from '../src/lib/firebase';

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

describe('Testear el register.js', () => {
  test('should return a user', () => {
    const result = register();
    const buttonIngresar = result.querySelector('.buttonRegisterHome');
    buttonIngresar.click();
    buttonIngresar.dispatchEvent(new Event('click'));
    expect(registerNewUser).toHaveBeenCalled();
  });
});
