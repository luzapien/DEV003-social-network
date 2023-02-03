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
import { app } from './firebase';

// Initialize Cloud Firestore and get a reference to the service
const dataBase = getFirestore(app);
/* funcion que cree collection. debe llamarse al registrarse */
// export function userCollection(userEmail) {
//   console.log(`entro al collection: ${userEmail}`);
//   addDoc(collection(dataBase, userEmail), {});
// }

export function createUserDoc(user) {
  return setDoc(doc(dataBase, 'usuarios', user.uid), {
    id: user.uid,
    correo: user.email,
    nombre: user.displayName,
    foto: user.photoURL,
  });
}

function createID() {
  return Math.random().toString(30).substring(2);
}

export function createPost(userId, postContent) {
  // crea un nuevo objeto `Date` con fecha y hora del momento
  const today = new Date();
  return addDoc(collection(dataBase, 'publicaciones'), {
    postId: createID(),
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

export function counterLike(userUid, postId) {
  // si usario ya le dio like entonces le quita el like
  // contar cantidad de items en el like para el numero de like que tiene la publicacion

  const postLikes = doc(dataBase, 'publicaciones', postId);

  const ref = collection(dataBase, 'publicaciones'); 
  const arr = query(ref, where('likes', 'array-contains', userUid));
  const array = getDocs(arr);
  array.then((result) => {
    if (result) {
      console.log('existe', result);
      updateDoc(postLikes, {
        likes: arrayRemove(userUid),
      });
    } else {
      // Atomically add a new region to the "regions" array field.
      console.log('nuevo', result);
      updateDoc(postLikes, {
        // likes: arrayUnion(`${userUid}2`),
        likes: arrayUnion(userUid),
      });
    }
  });
}
