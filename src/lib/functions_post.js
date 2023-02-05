import { isEmpty } from '@firebase/util';
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

export function counterLike(userUid, docPost) {
  // si usario ya le dio like entonces le quita el like
  // contar cantidad de items en el like para el numero de like que tiene la publicacion
  const postLikes = doc(dataBase, 'publicaciones', docPost.uid);
  const ref = collection(dataBase, 'publicaciones');
  const arrLike = query(ref, where('likes', 'array-contains', userUid));
  const getData = getDocs(arrLike);
  let dataLikes = '';

  getData.then((result) => {
    const arrayLikes = result;
    arrayLikes.forEach((d) => {
      if (d.exists()) {
      //  console.log('trae datos');
        dataLikes = d.data();
        if (dataLikes.likes.toString() === userUid) { // si existe quitar like
          console.log('existe, quitar like');
          updateDoc(postLikes, {
            likes: arrayRemove(userUid),
          });
        // } else {
        //   // no existe
        //   console.log('nuevo like');
        //   updateDoc(postLikes, {
        //     likes: arrayUnion(userUid),
        //   });
        }
      }
    });
    if (dataLikes === '') {
      console.log('nuevo like');
      updateDoc(postLikes, {
        likes: arrayUnion(userUid),
      });
    }
  });
}
