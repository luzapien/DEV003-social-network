import { resultEmailLogin } from '../../firebase';

// jest.mock('firebase/auth');
jest.mock('../src/lib/');

test('should return an email', async () => {
  const email = await resultEmailLogin('catsLover@gmail.com', 123456);

  expect(email.email).toBe('catslover@gmail.com');
});
