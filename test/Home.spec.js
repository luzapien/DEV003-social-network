import { logOutFunction, informationUser} from '../src/lib/firebase';
import { Home } from '../src/components/Home';

import { createPost, getUserPosts, deletePost, getUserFromFirestore, updatePost, counterLike, createID } from '../src/lib/functions_post';

jest.mock('../src/lib/firebase', () => ({
  logOutFunction: jest.fn(),
  informationUser: jest.fn(() => Promise.resolve({ uid: 21234 })),
}));

const user = { uid: 1234, nombre: "juan" };

jest.mock('../src/lib/functions_post', () => ({
  createPost: jest.fn(),
  getUserPosts: jest.fn(() => Promise.resolve([])),
  deletePost: jest.fn(),
  getUserFromFirestore: jest.fn(() => Promise.resolve({ data: () => user })),
  updatePost: jest.fn(),
  counterLike: jest.fn(),
  createID: jest.fn(),
}));

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

// eslint-disable-next-line jest/no-focused-tests
describe('first Test for Home', () => {
  let btnPost;
  let postInput;
  let spanPost;

  beforeEach(() => {

    document.body.appendChild(Home());
    btnPost = document.getElementById('submitPostBtn');
    postInput = document.getElementById('postInput');
    spanPost = document.getElementById('spanPost');
   
  });
  
  console.log(Home().outerHTML);
  it('Debería crear un post', async () => {
    createPost.mockImplementationOnce((userId, postContent) => Promise.resolve(
      {
        userId,
        contenido: postContent,
        likes: [],
      },
    ));
   
    postInput.value = 'Amo los gatitos';
    btnPost.click();
    await tick();
    expect(spanPost.value).toBe('Amo los gatitos');
    //   inputEmail.value = 'emailverify.com';
    //   inputPassword.value = '123456';
    //   buttonRegister.click();
    //   await tick();
    //   expect(window.alert).toBeCalled();
    // });
    // est.spyOn(window, 'alert').mockImplementation(() => {});
    // const TestModule = require('../module');
    // describe('Mock window property', () => {
    //   it('should mock window alert function', () => {
    //     Object.defineProperty(global, 'window', {
    //       value: {
    //         alert: jest.fn(),
    //       },
    //     });
    //     TestModule.notification();
    //     expect(window.alert).toBeCalled();
    //   });
    // });

    // it('Debería mostrar exito', async () => {
    //   registerNewUser.mockImplementationOnce((email, password) => Promise.resolve({
    //     user: { email, password },
    //   }));

    //   inputEmail.value = 'email@verify.com';
    //   inputPassword.value = '123456';

  //   buttonRegister.click();
  //   await tick();
  //   buttonRegister.dispatchEvent(new Event('click'));
  //   expect(registerNewUser).toHaveBeenCalled();
  // });
  });
});
