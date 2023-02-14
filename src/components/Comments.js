import { informationUser } from '../lib/firebase';
import { updatePost, createID, updateComments } from '../lib/functions_post';

export function paintComments(arrayComments, idButton) {
  const commentsContainer = document.getElementById(`commentDiv${idButton}`);
  commentsContainer.innerHTML = '';
  arrayComments.forEach((comentario) => {
    // console.log(comentario);
    const commentContainer = document.createElement('div');
    commentContainer.className = 'commentContainer';
    commentContainer.textContent = `${comentario.nombre}: ${comentario.contenido}`;
    commentsContainer.appendChild(commentContainer);
  });
}

export function comments(post, containerRender) {
  const user = informationUser();
  console.log('comments si corre');
  // console.log(user);
  let comentarios = [];
  const dataComments = post.comentarios;
  console.log(comentarios);
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
  commentsInput.placeholder = 'Escribe un comentario';
  const btnComments = document.createElement('button');
  btnComments.id = post.postId;
  btnComments.type = 'submit';
  btnComments.textContent = 'comentar';
  commentsForm.className = 'commentsForm';
  commentsForm.addEventListener('submit', (e) => {
    console.log('--->',user);
    comentarios.push({
      contenido: commentsInput.value, userId: user.uid, commentID: createID('comment'), date: new Date(), nombre: user.nombre,
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
      // commentContainer.textContent = comentario.contenido;
      commentContainer.textContent = `${comentario.userName}: ${comentario.contenido}`;
      commentsDiv.appendChild(commentContainer);
    });
  } else {
    commentsContainer.textContent = 'No hay comentarios';
  }

  commentsContainer.append(commentsDiv, commentsForm);
  commentsForm.append(commentsInput, btnComments);
  containerRender.appendChild(commentsContainer);

  return commentsContainer;
}
