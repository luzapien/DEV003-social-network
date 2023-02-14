import { informationUser } from '../lib/firebase';
import { modalDeletePost } from './ModalError';
import {
  updatePost, createID, updateComments, getUserFromFirestore,  removeComment,
} from '../lib/functions_post';

export function paintComments(arrayComments, idButton) {
  const user = informationUser();
  const commentsContainer = document.getElementById(`commentDiv${idButton}`);
  commentsContainer.innerHTML = '';
  arrayComments.forEach((comentario) => {
    // console.log(comentario);
    const commentContainer = document.createElement('div');
    commentContainer.className = 'commentContainer';
    // commentContainer.textContent = comentario.contenido;
    commentContainer.textContent = `${comentario.nombre}: ${comentario.contenido}`;
    /** ******BOTONES********** */
    const buttonDeletePost = document.createElement('button');
    const buttonEditPost = document.createElement('button');
    buttonDeletePost.id = comentario.commentID;
    buttonEditPost.id = comentario.commentID;
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
      commentsContainer.appendChild(modalDeletePost('¿Estás seguro de eliminar este post?'));
      // const answer = confirm('¿Estas seguro de elminar el post?');
      const buttonCancel = document.getElementById('cancel');
      const windowModalDelete = document.getElementById('windowModalDelete');
      buttonCancel.addEventListener('click', () => {
        commentsContainer.removeChild(windowModalDelete);
      });
      const buttonYes = document.getElementById('yes');
      buttonYes.addEventListener('click', () => {
        removeComment(comentario.postId, buttonDeletePost.id);
        commentContainer.remove();
        commentContainer.removeChild(windowModalDelete);
      });
    });
    // buttonEditPost.addEventListener('click', () => {
    //   const editPostDialog = dialogEditPost(buttonEditPost.id, container, spanPost);
    //   editPostDialog.showModal();
    // });
    if (user.uid === comentario.userId) {
      commentContainer.append(buttonEditPost);
    }
    commentContainer.append(buttonDeletePost);
    /** ****************** */
    commentsContainer.appendChild(commentContainer);
  });
}

export function comments(post, containerRender, postID) {
  const user = informationUser();
  getUserFromFirestore(user.uid).then((result) => {
    const nombreUser = result.data().nombre;
    // const nombreUser = userData.nombre;
    //   console.log('**********', nombreUser);
    // console.log('comments si corre');
    // console.log(user);placeHol
    let comentarios = [];
    const dataComments = post.comentarios;
    // console.log(comentarios);
    if (dataComments) {
      comentarios = dataComments;
    }
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'commentsContainer';


    const commentsDiv = document.createElement('div');
    commentsDiv.innerHTML = '';
    commentsDiv.className = 'commentsDiv';
    commentsDiv.id = `commentDiv${post.postId}`;

    const commentsForm = document.createElement('form');
    const commentsInput = document.createElement('input');
    commentsInput.type = 'texto';
    commentsInput.id = 'commentsInput';
    commentsInput.className = 'commentsInput';
    commentsInput.required = true;
    commentsInput.placeholder = 'Comenta el post';
    const btnComments = document.createElement('button');
    btnComments.id = post.postId;
    btnComments.type = 'submit';
    btnComments.textContent = 'comentar';
    commentsForm.className = 'commentsForm';
    commentsForm.addEventListener('submit', (e) => {
      //   console.log('--->', user);

      comentarios.push({
        contenido: commentsInput.value, userId: user.uid, commentID: createID('comment'), date: new Date(), nombre: nombreUser,

      });
      e.preventDefault();
      // console.log(comentarios);
      updateComments(user.uid, post, btnComments.id);
      commentsInput.value = '';
      updatePost(post.uid, {
        comentarios,

      }).then(() => {
      });
    });

    if (comentarios) {
      comentarios.forEach((comentario) => {
      // console.log(comentario);
        const commentContainer = document.createElement('div');
        commentContainer.className = 'commentContainer';
        commentContainer.id = 'commentContainer';
        const commentContainerName = document.createElement('div');
        commentContainerName.className = 'commentContainerName';
        commentContainerName.id = 'commentContainerName';
        const commentContainerContent = 
        // commentContainer.textContent = comentario.contenido;
        commentContainer.textContent = `${comentario.nombre}: ${comentario.contenido}`;
        //   console.log
        /** ******BOTONES********** */
        const buttonDeletePost = document.createElement('button');
        const buttonEditPost = document.createElement('button');
        buttonDeletePost.id = comentario.commentID;
        buttonEditPost.id = comentario.commentID;
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
          commentsContainer.appendChild(modalDeletePost('¿Estás seguro de eliminar este comentario?'));
          // const answer = confirm('¿Estas seguro de elminar el post?');
          const buttonCancel = document.getElementById('cancel');
          const windowModalDelete = document.getElementById('windowModalDelete');
          buttonCancel.addEventListener('click', () => {
            commentsContainer.removeChild(windowModalDelete);
          });
          const buttonYes = document.getElementById('yes');
          buttonYes.addEventListener('click', () => {
            console.log(buttonDeletePost.id);
            removeComment(postID, buttonDeletePost.id);
            commentContainer.remove();
            commentContainer.removeChild(windowModalDelete);
          });
        });
        // buttonEditPost.addEventListener('click', () => {
        //   const editPostDialog = dialogEditPost(buttonEditPost.id, container, spanPost);
        //   editPostDialog.showModal();
        // });
        if (user.uid === comentario.userId) {
          commentContainer.append(buttonEditPost);
        }
        commentContainer.append(buttonDeletePost);
        /** ****************** */
        commentsDiv.appendChild(commentContainer);
      });
    } else {
      commentsContainer.textContent = 'No hay comentarios';
    }

    commentsContainer.append(commentsDiv, commentsForm);
    commentsForm.append(commentsInput, btnComments);
    containerRender.appendChild(commentsContainer);

    return commentsContainer;
  });
}
