import { logOutFunction, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import { comments } from './Comments';
import { Dialog, closeDialog } from './Dialog';
import {
  createPost, getUserPosts, deletePost, getUserFromFirestore, updatePost, counterLike,
} from '../lib/functions_post';

export function paintLikes(numberLikes) {
  const containerLike = document.getElementById('lblCounterLike');
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
    // try {
    //   await updatePost(idPost, {
    //     contenido: inputText.value,
    //     date: new Date(),
    //   });
    //   spanPost.textContent = inputText.value;
    //   closeDialog();
    // } catch (error) {
    //   console.log(error);
    // }
  });

  const dialog = Dialog('Editar Post', formDialog);
  closeDialogBtn.addEventListener('click', () => closeDialog());
  container.appendChild(dialog);

  return dialog;
}

/* funcion que pinta el like */
export function paintLikes(numberLikes, idButton) {
  const containerLike = document.getElementById(`lbl${idButton}`);
  containerLike.innerText = numberLikes;
}

// export function paintComents(arrayComents) {
//   arrayComents.forEach;
// }
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
      console.log('leyendo array post');
      const postActionsContainer = document.createElement('div');
      const postActionsRight = document.createElement('div');
      postActionsRight.className = 'postActionsRight';
      postActionsContainer.className = 'postActions';
      const likeIcon = document.createElement('span');
      likeIcon.className = 'likeIcon';
      const likeBtn = document.createElement('button');
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

      /** ***LIKE***** */

      likeBtn.addEventListener('click', () => {
        console.log(likeBtn);
        counterLike(user.uid, doc, likeBtn.id);
        console.log(doc);
      });

      /** ************* */
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
      postActionsContainer.append(likeBtn, lblCounterLike, postActionsRight);
      sectionPost.append(spanPost, postActionsContainer);
      comments(doc, sectionPost);
    });
    container.appendChild(postWall);
  }).catch((error) => {
    console.log(error);
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
    createPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (postInput.value.trim() !== '') {
        createPost(user.uid, postInput.value).then(() => {
          showPost(sectionPost);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          createPostForm.reset();
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
    signOutBtn.addEventListener('click', () => {
      logOutFunction().then(() => {
        onNavigate('/');
      }).catch((error) => {
        console.log(error);
      });
      // try {
      //   await logOutFunction();
      //   onNavigate('/');
      // } catch (error) {
      //   console.log(error);
      // }
    });

    createPostForm.append(postInput, submitPostBtn);
    sectionWall.append(createPostForm, sectionPost);
    welcomeContainer.append(welcomeMessage, sectionWall);
    container.append(userImage, welcomeContainer, signOutBtn);
    showPost(sectionPost);
  }).catch((error) => {
    console.log(error);
  });

  return container;
};
