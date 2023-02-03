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
