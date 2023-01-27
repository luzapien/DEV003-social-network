import {
  getFirestore,
  collection,
  addDoc, setDoc,
  doc,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { app } from './firebase';

// Initialize Cloud Firestore and get a reference to the service
const dataBase = getFirestore(app);
/* funcion que cree collection. debe llamarse al registrarse */
export function userCollection(userEmail) {
  console.log(`entro al collection: ${userEmail}`);
  addDoc(collection(dataBase, userEmail), {});
}

export function createUserDoc(user) {
  return setDoc(doc(dataBase, 'usuarios', user.uid), {
    id: user.uid,
    correo: user.email,
    nombre: user.displayName,
    foto: user.photoURL,
  });
}

function createUserID() {
  return Math.random().toString(30).substring(2);
}

export function createPost(userId, postContent) {
  return addDoc(collection(dataBase, 'publicaciones'), {
    postId: createUserID(),
    userId,
    contenido: postContent,
  });
}

export async function getUserPosts(userId) {
  // Obtener documentos de una Colección
  const ref = collection(dataBase, 'publicaciones'); // Se crea la referencia de la colección
  const q = query( // Se crea la query/consulta
    ref,
    where('userId', '==', userId), // Condición donde userId sea igual al userId pasado como parámetro
  );

  return getDocs(q);
}
