import { logOutFunction, informationUser } from '../lib/firebase';
import { comments } from './Comments';
import { Dialog, closeDialog } from './Dialog';
import {
  createPost, getUserPosts, deletePost, getUserFromFirestore, updatePost, counterLike,
} from '../lib/functions_post';
import { modalError, modalDeletePost } from './ModalError';

export function paintLikes(numberLikes, idButton) {
  const containerLike = document.getElementById(`lbl${idButton}`);
  containerLike.innerText = numberLikes;
}
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
  formDialog.addEventListener('submit', (e) => {
    e.preventDefault();
    updatePost(idPost, {
      contenido: inputText.value,
    }).then(() => {
      spanPost.textContent = inputText.value;
      closeDialog();
    }).catch((error) => {
      console.log(error);
    });
  });

  const dialog = Dialog('Editar Post', formDialog);
  closeDialogBtn.addEventListener('click', () => closeDialog());
  container.appendChild(dialog);

  return dialog;
}

/* ========= Funcion que crea y ordena por fecha los posts del usuario ========= */
function showPost(container) {
  container.innerHTML = '';
  const user = informationUser();
  getUserPosts(user.uid).then((result) => {
    const postsObject = result;
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
      // const comments = Comments(doc);
      // console.log('leyendo array post');
      const postActionsContainer = document.createElement('div');
      const postActionsRight = document.createElement('div');
      postActionsRight.className = 'postActionsRight';
      postActionsContainer.className = 'postActions';
      const postActionsLeft = document.createElement('div');
      postActionsLeft.className = 'postActionLeft';
      postActionsLeft.id = 'postActionLeft';
      const likeIcon = document.createElement('span');
      likeIcon.className = 'likeIcon';
      const likeBtn = document.createElement('button');
      const textLikeBtn = document.createElement('div');
      textLikeBtn.className = 'textLikeBtn';
      textLikeBtn.id = 'textLikeBtn';
      textLikeBtn.textContent = 'Me gusta';
      likeBtn.type = 'button';
      likeBtn.className = 'likeBtn';
      const lblCounterLike = document.createElement('label');
      lblCounterLike.className = 'lblCounterLike';
      lblCounterLike.id = `lbl${doc.postId}`;
      //  console.log(doc.likes);
      if (doc.likes.length === 0) {
        lblCounterLike.innerText = 0;
      } else {
        lblCounterLike.innerText = doc.likes.length;
      }
      likeBtn.id = doc.postId;
      likeBtn.appendChild(likeIcon);
      postActionsLeft.append(likeBtn, lblCounterLike, textLikeBtn);
      /** ***LIKE***** */

      likeBtn.addEventListener('click', () => {
        // console.log(likeBtn);
        counterLike(user.uid, doc, likeBtn.id);
        // console.log(doc);
      });

      /** ************* */
      const sectionPost = document.createElement('div');
      sectionPost.className = 'section-post';
      const spanPostUserName = document.createElement('span');
      spanPostUserName.className = 'span-post-user-name';
      spanPostUserName.innerHTML = doc.nombre;
      console.log('nombre', doc);
      const enter = document.createElement('br');
      const spanPost = document.createElement('span');
      spanPost.className = 'span-post';
      spanPost.id = 'spanPost';
      spanPost.innerHTML = doc.contenido;
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
        container.appendChild(modalDeletePost('¿Estás seguro de eliminar este post?'));
        // const answer = confirm('¿Estas seguro de elminar el post?');
        const buttonCancel = document.getElementById('cancel');
        const windowModalDelete = document.getElementById('windowModalDelete');
        buttonCancel.addEventListener('click', () => {
          container.removeChild(windowModalDelete);
        });
        const buttonYes = document.getElementById('yes');
        buttonYes.addEventListener('click', () => {
          deletePost(buttonDeletePost.id);
          sectionPost.remove();
          container.removeChild(windowModalDelete);
        });
      });
      buttonEditPost.addEventListener('click', () => {
        const editPostDialog = dialogEditPost(buttonEditPost.id, container, spanPost);
        editPostDialog.showModal();
      });
      if (user.uid === doc.userId) {
        postActionsRight.append(buttonEditPost, buttonDeletePost);
      }
      postActionsContainer.append(postActionsLeft, postActionsRight);
      sectionPost.append(spanPostUserName, enter, spanPost, postActionsContainer);
      comments(doc, sectionPost);
    });
    container.appendChild(postWall);
  }).catch((error) => {
    console.log(error);
    throw new Error(error.message);
  });
}

export const Home = () => {
  const user = informationUser();
  // const result = await getUserFromFirestore(user.uid);
  const container = document.createElement('section');
  container.className = 'mainContainer';

  getUserFromFirestore(user.uid).then((result) => {
    const userData = result.data();
    document.title = 'Home';
    const userImage = document.createElement('img');
    userImage.width = 120;
    userImage.height = 120;
    userImage.className = 'userImage';
    userImage.alt = 'User image';
    userImage.src = userData.foto;

    const welcomeContainer = document.createElement('section');
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.innerHTML = `Bienvenido(a), <strong>${userData.nombre}<strong/>`;

    /** **************MURO****************** */
    const sectionWall = document.createElement('section');
    sectionWall.id = 'scWall';
    const sectionPost = document.createElement('section');
    sectionPost.id = 'scPost';
    const postInput = document.createElement('input');
    postInput.id = 'postInput';
    postInput.className = 'post-input';
    postInput.type = 'text';
    postInput.placeholder = '¿Qué vas a compartir?';
    const createPostForm = document.createElement('form');
    createPostForm.className = 'create-post-form';
    const submitPostBtn = document.createElement('button');
    submitPostBtn.id = 'submitPostBtn';
    submitPostBtn.textContent = 'Publicar';
    submitPostBtn.type = 'submit';
    submitPostBtn.className = 'stylesBtns createPostBtn';
    createPostForm.id = 'allPostContainer';
    createPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (postInput.value.trim() !== '') {
        createPost(user.uid, userData.nombre, postInput.value).then((result) => {
          console.log('holaaa--->', result);
          showPost(sectionPost);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          createPostForm.reset();
        });
      } else {
        container.appendChild(modalError('No hay nada que publicar'));
      }
    });

    /** ********FIN MURO******************* */
    const signOutIcon = document.createElement('span');
    signOutIcon.className = 'signOutIcon';
    const signOutBtn = document.createElement('button');
    signOutBtn.className = 'stylesBtns signOutBtn';
    signOutBtn.title = 'Cerrar sesión';
    signOutBtn.type = 'button';
    const exitButtonText = document.createElement('div');
    exitButtonText.className = 'exitButtonText';
    exitButtonText.id = 'exitButtonText';
    exitButtonText.textContent = 'Salir';
    signOutBtn.append(signOutIcon, exitButtonText);
    signOutBtn.addEventListener('click', () => {
      logOutFunction().then(() => {
        // onNavigate('/');
      }).catch((error) => {
        console.log(error);
        throw new Error('error:', error.message);
      });
      // try {
      //   await logOutFunction();
      //   onNavigate('/');
      // } catch (error) {
      //   console.log(error);
      // }
    });
    // console.log(userImage.innerHTML);

    createPostForm.append(postInput, submitPostBtn);
    sectionWall.append(createPostForm, sectionPost);
    welcomeContainer.append(welcomeMessage, sectionWall);
    container.append(userImage, welcomeContainer, signOutBtn);
    showPost(sectionPost);
  }).catch((error) => {
    console.log(error);
    throw new Error('error:', error.message);
  });

  return container;
};
