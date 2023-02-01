import { logOutFunction, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import { Dialog, closeDialog } from './Dialog';
import {
  createPost, getUserPosts, deletePost, getUserFromFirestore, updatePost,
} from '../lib/functions_post';

function dialogEditPost(idPost, container, spanPost) {
  const postContent = spanPost.textContent;
  const formDialog = document.createElement('form');
  formDialog.className = 'formDialog';
  const inputText = document.createElement('textarea');
  inputText.placeholder = postContent;
  inputText.value = postContent;
  const dialogActions = document.createElement('div');
  dialogActions.className = 'dialogActions';
  const closeDialogBtn = document.createElement('button');
  closeDialogBtn.type = 'button';
  closeDialogBtn.className = 'stylesBtns';
  closeDialogBtn.textContent = 'Cerrar';
  const btnUpdate = document.createElement('button');
  btnUpdate.textContent = 'Actualizar';
  btnUpdate.id = 'buttonEditDialog';
  btnUpdate.type = 'submit';
  btnUpdate.className = 'stylesBtns';

  dialogActions.append(btnUpdate, closeDialogBtn);
  formDialog.append(inputText, dialogActions);
  formDialog.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await updatePost(idPost, {
        contenido: inputText.value,
        date: new Date(),
      });
      spanPost.textContent = inputText.value;
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  });

  const dialog = Dialog('Editar Post', formDialog);
  closeDialogBtn.addEventListener('click', () => closeDialog());
  container.appendChild(dialog);

  return dialog;
}

/* ========= Funcion que crea y ordena por fecha los posts del usuario ========= */
async function showPost(container) {
  container.innerHTML = '';
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
  arrayPosts.forEach((doc) => {
    const postActionsContainer = document.createElement('div');
    const postActionsRight = document.createElement('div');
    postActionsRight.className = 'postActionsRight';
    postActionsContainer.className = 'postActions';
    const likeIcon = document.createElement('span');
    likeIcon.className = 'likeIcon';
    const likeBtn = document.createElement('button');
    likeBtn.type = 'button';
    likeBtn.className = 'likeBtn';
    likeBtn.appendChild(likeIcon);
    const sectionPost = document.createElement('div');
    sectionPost.className = 'section-post';
    const spanPost = document.createElement('span');
    spanPost.className = 'span-post';
    spanPost.innerText = doc.contenido;
    postWall.appendChild(sectionPost);
    const buttonDeletePost = document.createElement('button');
    const buttonEditPost = document.createElement('button');
    buttonDeletePost.id = doc.uid;
    buttonEditPost.id = doc.uid;
    buttonDeletePost.className = 'btnDelete';
    buttonDeletePost.title = 'Eliminar';
    buttonEditPost.className = 'btnEdit';
    buttonEditPost.title = 'Editar';
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'deleteIcon';
    buttonDeletePost.appendChild(deleteIcon);
    const editIcon = document.createElement('span');
    editIcon.className = 'editIcon';
    buttonEditPost.appendChild(editIcon);
    buttonDeletePost.addEventListener('click', () => {
      // eslint-disable-next-line no-restricted-globals
      const answer = confirm('¿Estas seguro de elminar el post?');
      if (answer) {
        deletePost(buttonDeletePost.id);
        // console.log(buttonDeletePost.id);
        sectionPost.remove();
      }
    });
    buttonEditPost.addEventListener('click', () => {
      const editPostDialog = dialogEditPost(buttonEditPost.id, container, spanPost);
      editPostDialog.showModal();
    });
    postActionsRight.append(buttonEditPost, buttonDeletePost);
    postActionsContainer.append(likeBtn, postActionsRight);
    sectionPost.append(spanPost, postActionsContainer);
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
  postInput.className = 'post-input';
  postInput.type = 'text';
  postInput.placeholder = '¿Qué vas a compartir?';
  const createPostForm = document.createElement('form');
  createPostForm.className = 'create-post-form';
  const submitPostBtn = document.createElement('button');
  submitPostBtn.textContent = 'Publicar';
  submitPostBtn.type = 'submit';
  submitPostBtn.className = 'stylesBtns createPostBtn';
  createPostForm.id = 'allPostContainer';
  createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (postInput.value.trim() !== '') {
      try {
        await createPost(user.uid, postInput.value);
      } catch (error) {
        console.log(error);
      } finally {
        createPostForm.reset();
      }

      showPost(sectionPost);
      const btnsDelete = document.querySelectorAll('.btnDelete');
      btnsDelete.forEach((button) => {
        console.log(button.id);
      });
    } else {
      alert('No hay nada que publicar');
    }
  });

  /** ********FIN MURO******************* */
  const signOutIcon = document.createElement('span');
  signOutIcon.className = 'signOutIcon';
  const signOutBtn = document.createElement('button');
  signOutBtn.className = 'stylesBtns signOutBtn';
  signOutBtn.title = 'Cerrar sesión';
  signOutBtn.type = 'button';
  signOutBtn.appendChild(signOutIcon);
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
