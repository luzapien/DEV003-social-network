import { logOutFunction, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import {
  createPost, getUserPosts, deletePost, getUserFromFirestore, updatePost,
} from '../lib/functions_post';

function dialogEditPost(idPost, text, container) {
  const dialogTag = document.createElement('dialog');
  dialogTag.open = true;
  const formDialog = document.createElement('form');
  formDialog.method = 'dialog';
  const inputText = document.createElement('input');
  inputText.value = text;
  const btnUpdate = document.createElement('button');
  btnUpdate.type = 'submit';
  formDialog.append(inputText, btnUpdate);
  dialogTag.appendChild(formDialog);
  formDialog.addEventListener('submit', async () => {
    console.log(`sirvo en form ${idPost}`);
    await updatePost(idPost, {
      contenido: inputText.value,
      date: new Date(),
    });
    const spanPost = document.getElementById('span-post');
    spanPost.textContent = inputText.value;
  });
  console.log('tambien sirvo');
  container.appendChild(dialogTag);
  return dialogTag;
}

/* ========= Funcion que crea y ordena por fecha los posts del usuario ========= */
async function showPost(container) {
  const user = informationUser();
  const postsObject = await getUserPosts(user.uid);
  const postWall = document.createElement('section');
  postWall.innerHTML = '';
  postWall.id = 'post-wall';
  const arrayPosts = [];
  postsObject.forEach((doc) => {
    const dataPostUid = doc.data();
    dataPostUid.uid = doc.id;
    arrayPosts.push(dataPostUid);
  });
  arrayPosts.sort((a, b) => a.date.seconds - b.date.seconds);
  arrayPosts.forEach((doc) => {
    const sectionPost = document.createElement('div');
    sectionPost.id = 'section-post';
    const spanPost = document.createElement('span');
    spanPost.id = 'span-post';
    spanPost.innerText = doc.contenido;
    postWall.appendChild(sectionPost);
    const buttonDeletePost = document.createElement('button');
    const buttonEditPost = document.createElement('button');
    buttonDeletePost.id = doc.uid;
    buttonEditPost.id = doc.uid;
    buttonDeletePost.className = 'btnDelete';
    buttonEditPost.className = 'btnEdit';
    buttonDeletePost.textContent = '🗑️';
    buttonEditPost.textContent = '🖉';
    buttonDeletePost.addEventListener('click', () => {
      deletePost(buttonDeletePost.id);
      // console.log(buttonDeletePost.id);
      sectionPost.innerHTML = '';
    });
    buttonEditPost.addEventListener('click', () => {
      dialogEditPost(buttonEditPost.id, doc.contenido, sectionPost);
    });
    sectionPost.append(spanPost, buttonEditPost, buttonDeletePost);
  });
  container.appendChild(postWall);
}

export const Home = async () => {
  const user = informationUser();
  const result = await getUserFromFirestore(user.uid);
  const userData = result.data();
  document.title = 'Home';
  const userImage = document.createElement('img');
  userImage.width = 120;
  userImage.height = 120;
  userImage.className = 'userImage';
  userImage.alt = 'User image';
  userImage.src = userData.foto;
  const container = document.createElement('section');
  container.className = 'mainContainer';

  const welcomeContainer = document.createElement('section');
  const welcomeMessage = document.createElement('h2');
  welcomeMessage.innerHTML = `Bienvenido(a), <strong>${userData.nombre}<strong/>`;

  /** **************MURO****************** */
  const sectionWall = document.createElement('section');
  sectionWall.id = 'scWall';
  const sectionPost = document.createElement('section');
  sectionPost.id = 'scPost';
  const postInput = document.createElement('input');
  postInput.className = 'form-input';
  postInput.type = 'text';
  postInput.placeholder = '¿Qué vas a compartir?';
  const createPostForm = document.createElement('form');
  createPostForm.className = 'create-post-form';
  const submitPostBtn = document.createElement('button');
  submitPostBtn.textContent = 'Publicar';
  submitPostBtn.type = 'submit';
  submitPostBtn.className = 'stylesBtns';
  createPostForm.id = 'allPostContainer';
  createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await createPost(user.uid, postInput.value);
    } catch (error) {
      console.log(error);
    } finally {
      createPostForm.reset();
    }
    sectionPost.innerHTML = '';
    showPost(sectionPost);
    const btnsDelete = document.querySelectorAll('.btnDelete');
    btnsDelete.forEach((button) => {
      console.log(button.id);
    });
  });

  /** ********FIN MURO******************* */
  const signOutBtn = document.createElement('button');
  signOutBtn.className = 'stylesBtns signOutBtn';
  signOutBtn.type = 'button';
  signOutBtn.innerText = 'Cerrar sesión';
  signOutBtn.addEventListener('click', async () => {
    try {
      await logOutFunction();
      onNavigate('/');
    } catch (error) {
      console.log(error);
    }
  });

  container.append(userImage, welcomeContainer);
  welcomeContainer.appendChild(welcomeMessage);

  welcomeContainer.appendChild(sectionWall);
  createPostForm.append(postInput, submitPostBtn);
  sectionWall.appendChild(createPostForm);
  sectionWall.appendChild(sectionPost);
  showPost(sectionPost);
  container.appendChild(signOutBtn);
  return container;
};
