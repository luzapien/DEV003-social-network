//jest.mock('firebase/auth');
import { async } from 'regenerator-runtime';
import {emailLogin} from '../firebase';

export const resultEmailLogin = async  () => {
    const resultPromise = await emailLogin();
}
