import { logOutFunction, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import { createPost, getUserPosts } from '../lib/functions_post';

async function showPost(container) {
  const user = informationUser();
  if (!user) {
    console.log('no hay usuario');
  } else {
    console.log(user.uid);
  }
  const postsObject = await getUserPosts(user.uid);
  const postWall = document.createElement('section');
  postWall.id = 'post-wall';
  const arrayPosts = [];
  postsObject.forEach((doc) => {
    arrayPosts.push(doc.data());
  });
  arrayPosts.sort((a, b) => a.date.seconds - b.date.seconds);
  arrayPosts.forEach((doc) => {
    const sectionPost = document.createElement('div');
    sectionPost.innerText = doc.contenido;
    postWall.appendChild(sectionPost);
  });
  console.log(postWall);
  container.appendChild(postWall);
}

export const Home = () => {
  console.log('ya no me repito :D');
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
    window.location.reload();
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

  welcomeContainer.appendChild(sectionPost);
  frmEnterPost.append(textPost, submitPostBtn);
  sectionPost.appendChild(frmEnterPost);
  showPost(sectionPost);

  container.appendChild(signOutBtn);
  return container;
};
