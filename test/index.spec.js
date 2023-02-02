// importamos la funcion que vamos a testear
import { emailLogin } from '../src/lib/firebase';

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
jest.mock('../src/lib/firebase.js');

jest.mock('@firebase/firestore', () => (
  {
    getFirestore: () => ({ currentUser: 'string' }),
    collection: () => ({}),
    addDoc: () => ({ user: 'string' }),
    setDoc: () => ({ user: 'string' }),
    deleteDoc: () => ({ user: '' }),
    doc: () => ({ user: 'string' }),
    where: () => ({ user: 'string' }),
    query: () => ({ user: 'string' }),
    getDoc: () => ({ user: 'string' }),
    getDocs: () => ({ user: 'string' }),
    updateDoc: () => ({ user: 'string' }),
    orderBy: () => ({ user: 'string' }),

  }
));

jest.mock('../src/lib/functions_post');
// * -----Test para Login -----*/

describe('functionLogin', () => {
  it('deberia ingresar el usuario', async () => {
    const userCredential = emailLogin('Karen', 'karen@hotmail.com', '123456');
    await expect(userCredential).resolves.toEqual({ currentUser: 'string' });
  });
  // Esto es para el catch
  // eslint-disable-next-line max-len
/* it('deberia dar error al no llenar completos los campos', async () => functionSignUp('', '', '').then((userCredential) => {
    expect(userCredential).toEqual({ currentUser: 'string' });
  })); */
});
