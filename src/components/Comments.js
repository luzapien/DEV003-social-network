import { informationUser } from '../lib/firebase';
import { updatePost, createID } from '../lib/functions_post';

let commentsData;
export function comments(post, containerRender) {
  post.innerHtml = '';
  console.log('comments si corre');
  // console.log(user);
  let comentarios = [];
  const dataComments = post.comentarios;
  commentsData = post.comentarios;
  console.log(comentarios);
  if (dataComments) {
    comentarios = dataComments;
  }
  const commentsContainer = document.createElement('div');
  commentsContainer.className = 'commentsContainer';

  const commentsDiv = document.createElement('div');
  commentsDiv.className = 'commentsDiv';

  const commentsForm = document.createElement('form');
  const commentsInput = document.createElement('input');
  commentsInput.type = 'texto';
  commentsInput.id = 'comments-input';
  commentsInput.required = true;
  commentsInput.placeholder = 'Escribe un comentario';
  const btnComments = document.createElement('button');
  btnComments.type = 'submit';
  btnComments.textContent = 'comentar';
  commentsForm.className = 'commentsForm';
  commentsForm.id = 'comments-form';

  if (comentarios) {
    comentarios.forEach((comentario) => {
      // console.log(comentario);
      const commentContainer = document.createElement('div');
      commentContainer.className = 'commentContainer';
      commentContainer.textContent = comentario.contenido;
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

export function commentsUpdate(post) {
  const user = informationUser();
  const commentsForm = document.getElementById('comments-form');
  console.log(commentsForm);
  const commentsInput = document.getElementById('comments-input');
  const sectionPost = document.getElementById('section-post');
  commentsForm.addEventListener('submit', (e) => {
    commentsData.push({
      contenido: commentsInput.value, userId: user.uid, commentID: createID('comment'), date: new Date(),
    });
    e.preventDefault();
    // console.log(comentarios);
    updatePost(post.uid, {
      commentsData,
    }).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  });
  comments(post, sectionPost);
}
