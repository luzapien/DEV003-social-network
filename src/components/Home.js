import { logOutFunction, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import { createPost, getUserPosts, deletePost } from '../lib/functions_post';

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
    sectionPost.innerText = doc.contenido;
    postWall.appendChild(sectionPost);
    const buttonDeletePost = document.createElement('button');
    const buttonEditPost = document.createElement('button');
    buttonDeletePost.id = doc.uid;
    buttonDeletePost.id = doc.uid;
    buttonDeletePost.className = 'btnDelete';
    buttonEditPost.className = 'btnEdit';
    buttonDeletePost.textContent = '🗑️';
    buttonEditPost.textContent = '🖉';
    buttonDeletePost.addEventListener('click', () => {
      deletePost(buttonDeletePost.id);
      // console.log(buttonDeletePost.id);
      sectionPost.innerHTML = '';
    });
    sectionPost.append(buttonEditPost, buttonDeletePost);
  });
  container.appendChild(postWall);
}

export const Home = () => {
  const user = informationUser();
  document.title = 'Home';
  const title = document.createElement('h1');
  title.innerText = 'Home';
  const container = document.createElement('section');
  container.className = 'mainContainer';

  const welcomeContainer = document.createElement('section');
  const labelWelcome = document.createElement('label');
  labelWelcome.innerHTML = `Bienvenido <strong>${user.displayName}<strong/>`;

  /** **************MURO****************** */
  const sectionWall = document.createElement('section');
  sectionWall.id = 'scWall';
  const sectionPost = document.createElement('section');
  sectionPost.id = 'scPost';
  const textPost = document.createElement('input');
  textPost.type = 'text';
  textPost.placeholder = '¿Qué vas a compartir?';
  const frmEnterPost = document.createElement('form');
  const submitPostBtn = document.createElement('button');
  submitPostBtn.textContent = 'Publicar';
  submitPostBtn.type = 'submit';
  frmEnterPost.id = 'allPostContainer';
  frmEnterPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await createPost(user.uid, textPost.value);
    } catch (error) {
      console.log(error);
    } finally {
      frmEnterPost.reset();
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

  container.appendChild(title);
  container.appendChild(welcomeContainer);
  welcomeContainer.appendChild(labelWelcome);

  welcomeContainer.appendChild(sectionWall);
  frmEnterPost.append(textPost, submitPostBtn);
  sectionWall.appendChild(frmEnterPost);
  sectionWall.appendChild(sectionPost);
  showPost(sectionPost);
  container.appendChild(signOutBtn);
  return container;
};
