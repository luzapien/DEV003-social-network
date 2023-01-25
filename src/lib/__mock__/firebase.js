// jest.mock('firebase/auth');
import { emailLogin } from '../firebase';

export const resultEmailLogin = async () => {
  const resultPromise = await emailLogin('catslover@gmail.com', 123456);
  console.log(resultPromise);
  return resultPromise;
};
