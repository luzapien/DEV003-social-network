import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './firebase';

// Initialize Cloud Firestore and get a reference to the service
const dataBase = getFirestore(app);

/* funcion que cree collection. debe llamarse al registrarse */
export function userCollection(userEmail) {
  console.log(`entro al collection: ${userEmail}`);
  addDoc(collection(dataBase, userEmail), {});
}

// export function userCollectionGoogle(userEmail) {
//   // const citiesRef = collection(db, "cities");
//   console.log(`entro al collection: ${userEmail}`);
//   // db.collection("users")
//   const userSearchC = dataBase.collection(userEmail);
//   console.log(userSearchC);
//   // // collection(dataBase, userEmail);
//   try {
//     console.log(userSearchC);
//   } catch (error) {
//     console.log(error.code);
//   }

//   // if (userSearchC === '') {
//   //   addDoc(collection(dataBase, userEmail), {});
//   // } else {
//   //   console.log('nada');
//   // }
// }
