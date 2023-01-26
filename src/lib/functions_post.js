
import { insert, getItems, update } from "./firestore.js";
import { createUserID } from "./createUserID.js";
import { getFirestore,collection, addDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let currentUser;
let todos = [];
//const todoInput = document.getElementById("todo-input");
//const todoForm = document.getElementById("todo-form");
//const userInfo = document.getElementById("user-info");
const allPostContainer = document.getElementById("allPostContainer");





//addNewPost
async function addNewPost(text) {
  /*
  try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} */
  try {
    const newPost = {
      id: createUserID(),
      text: text,
//agregar fecha de creacion
      userid: currentUser.uid,
    };
    const response = await insert(newPost);
    loadAllPost();
  } catch (error) {
    console.error(error);
  }
}

/*funcion que cree collection. debe llamarse al registrarse */
async function userCollection (){
  try {
    
  } catch (error) {
    
  }
}

export async function insert(item) {
  //crear coleccion e insertar post
  //obtener coleccion del usuario
  //coleccion se crea al registrar
  try {
    //colecion por usuario
  /*  const response = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });*/
    const response = await addDoc(collection(db,userRegisterColection)),item;

    }
  //  db.collection("users").add(todo);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItems(uid) {
  try {
    let items = [];
    const response = await db
      .collection("users")
      .where("userid", "==", uid)
      .get();

    response.forEach(function (item) {
      items.push(item.data());
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
}




  
  async function loadAllPost() {
    allPostContainer.innerHTML = "";
    todos = [];
  
    try {
      const response = await getItems(currentUser.uid);
  
      todos = [...response];
      showAllPost();
    } catch (error) {
      console.error(error);
    }
  }
  
  function showAllPost() {
    let html = "";
    todos.forEach((todo) => {
      html += `
        <label for="${todo.id}">${todo.text}</label>
        <button id="btnEdit">Editar</button>
        <button id="btnDelete">Elminar</button><br>
      `;
    });
  
    allPostContainer.innerHTML = html;
  
    document
      .querySelectorAll("btnEdit")
      .forEach((checkbox) => {
        checkbox.addEventListener("click", async (e) => {
          const id = e.target.id;
          console.log("Editando...")
         /* try {
            await update(id, e.target.checked);
          } catch (error) {
            console.error(error);
          }*/
        });
      });


      document
      .querySelectorAll("btnDelete")
      .forEach((checkbox) => {
        checkbox.addEventListener("click", async (e) => {
          const id = e.target.id;
          console.log("Eliminar...")
         /* try {
            await update(id, e.target.checked);
          } catch (error) {
            console.error(error);
          }*/
        });
      });
  }

  export async function update(id) {
    try {
      let docId;
      const doc = await db.collection("todos").where("id", "==", id).get();
      doc.forEach((i) => {
        docId = i.id;
      });
  
     // await db.collection("todos").doc(docId).update({ completed: completed });
    } catch (error) {
      throw new Error(error);
    }
  }