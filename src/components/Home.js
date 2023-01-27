import { logOutFunction, getCurrentUser, informationUser } from '../lib/firebase';
import { onNavigate } from '../router';
import { createPost, getUserPosts } from '../lib/functions_post';

const allposts = [];

async function showPost(container) {
  const user = getCurrentUser();
  if (!user) {
    console.log('no hay usuario');
  } else {
    console.log(user.uid);
  }

  // const prueba = await getUserPosts(user.uid);
  // prueba.forEach((doc) => {
  //   const sectionPost = document.createElement('section');
  //   sectionPost.innerText = doc.data();
  //   container.appendChild(sectionPost);
  //   // sectionPost.id = ''
  //   // console.log(doc.data());
  // });
}

export const Home = () => {
  const usuario = informationUser();
  const user = getCurrentUser();
  document.title = 'Home';
  const title = document.createElement('h1');
  title.innerText = 'Home';
  const container = document.createElement('section');
  container.className = 'mainContainer';

  const welcomeContainer = document.createElement('section');
  const labelWelcome = document.createElement('label');
  labelWelcome.innerHTML = `Bienvenido <strong>${usuario}<strong/>`;

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
    //  loadAllPost();
    } catch (error) {
      console.log(error);
    } finally {
      frmEnterPost.reset();
    }
  });
  const postSection = document.createElement('section');
  showPost(postSection);
  /** ********FIN MURO******************* */
  const signOutBtn = document.createElement('button');
  signOutBtn.type = 'button';
  signOutBtn.innerText = 'Cerrar sesión';
  signOutBtn.addEventListener('click', async () => {
    try {
      await logOutFunction();
      onNavigate('/login');
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

  container.appendChild(signOutBtn);
  return container;
};

function loadAllPost() {
  const containerAllPost = document.getElementById('allPostContainer');
  containerAllPost.innerHTML = '';
  allposts= [];
  try {
    const response= await getUserPosts(userUid);
  } catch (error) {
    
  }
}
