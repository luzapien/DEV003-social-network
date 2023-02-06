import {
  getFirestore,
  collection,
  addDoc, setDoc,
  deleteDoc,
  doc,
  where,
  query,
  getDoc,
  getDocs,
  updateDoc,
  orderBy,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import {
  getDatabase, child, push, update,
} from 'firebase/database';
import { app } from './firebase';

// Initialize Cloud Firestore and get a reference to the service
const dataBase = getFirestore(app);
/* funcion que cree collection. debe llamarse al registrarse */
// export function userCollection(userEmail) {
//   console.log(`entro al collection: ${userEmail}`);
//   addDoc(collection(dataBase, userEmail), {});
// }
export function createID(use) {
  const idGenerator = Math.random().toString(30).substring(2);
  return use + idGenerator;
}
export function createUserDoc(user) {
  return setDoc(doc(dataBase, 'usuarios', user.uid), {
    id: user.uid,
    correo: user.email,
    nombre: user.displayName,
    foto: user.photoURL,
  });
}

export function createPost(userId, postContent) {
  const postId = createID('post');
  console.log(postId);
  // crea un nuevo objeto `Date` con fecha y hora del momento
  const today = new Date();
  return addDoc(collection(dataBase, 'publicaciones'), {
    postId,
    userId,
    contenido: postContent,
    likes: [],
    date: today,
  });
}

export function deletePost(idPost) {
  deleteDoc(doc(dataBase, 'publicaciones', idPost));
}

export function getUserPosts(userId) {
  // Obtener documentos de una Colección
  const ref = collection(dataBase, 'publicaciones'); // Se crea la referencia de la colección
  const q = query( // Se crea la query/consulta
    ref,
    where('userId', '==', userId), // Condición donde userId sea igual al userId pasado como parámetro
    orderBy('date', 'desc'),
  );
  return getDocs(q);
}

export function updatePost(postId, newFields) {
  return updateDoc(doc(dataBase, 'publicaciones', postId), newFields);
}

export const getUserFromFirestore = (userId) => {
  const ref = doc(dataBase, 'usuarios', userId);
  return getDoc(ref);
};

function addLike(postLikes, userUid) {
  updateDoc(postLikes, {
    likes: arrayUnion(userUid),
  });
}

function removeLike(postLikes, userUid) {
  updateDoc(postLikes, {
    likes: arrayRemove(userUid),
  });
}

export function counterLike(userUid, docPost) {
  // si usario ya le dio like entonces le quita el like
  // contar cantidad de items en el like para el numero de like que tiene la publicacion
  // xxxxxx
  const postLikes = doc(dataBase, 'publicaciones', docPost.uid);
  const ref = collection(dataBase, 'publicaciones');
  const arrLike = query(ref, where('postId', '==', docPost.postId)); // where('likes', 'array-contains', userUid));
  const getData = getDocs(arrLike);
  let dataLikes = '';
  let cantLikes;

  getData.then((result) => {
    const arrayLikes = result;
    arrayLikes.forEach((d) => {
      if (d.exists()) {
        console.log('trae datos');
        dataLikes = d.data();
        //  console.log('datalikes id:', dataLikes);
        //  console.log('viene de home post id:', docPost);
        if (dataLikes.postId === docPost.postId) {
          console.log('encontro el post');
          //   console.log('post', dataLikes.likes);
          //  console.log(dataLikes.likes.toString());
          if (dataLikes.likes.length > 0) {
            console.log(dataLikes.likes);
            for (let i = 0; i < dataLikes.likes.length; i += 1) {
              if (dataLikes.likes[i] === userUid) {
                console.log('iguales', dataLikes.likes[i], userUid);
                removeLike(postLikes, userUid);
                //     console.log('existe, quitar like:', dataLikes.likes.length - 1
                cantLikes = dataLikes.likes.length - 1;
              } else {
                console.log('diferentes', dataLikes.likes[i], userUid);
                addLike(postLikes, userUid);
                //     console.log('nuevo total like:', dataLikes.likes.length + 1);
                cantLikes = dataLikes.likes.length + 1;
              }
            }
          } else {
            console.log('no tiene ningun like');
            addLike(postLikes, userUid);
            console.log('nuevo total like:', dataLikes.likes.length + 1);
          }
        }
      }
    });
    console.log('total likes', cantLikes);
    return cantLikes;
  });
}

export function writeNewComment(contenido, userId) {
  const db = getDatabase();
  const ref = collection(dataBase, 'publicaciones');

  // A post entry.
  const newFieldsComments = {
    comentarios: [{
      contenido,
      userId,
    }],
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'comentarios')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/comentarios/${newPostKey}`] = newFieldsComments;
  updates[`/publicaciones-comentarios/${userId}/${newPostKey}`] = newFieldsComments;

  return update(ref(db), updates);
}
