// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import {
  loginWithGoogle, logOutFunction, emailLogin, registerNewUser, userStatusValidation
} from './lib/firebase';

// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(app);

const btnGoogle = document.getElementById('btnGoogle');

function displayElement(user) {
  if (user) {
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
    console.log(user);
  } else {
    document.getElementById('scWelcome').style.display = 'none';
    document.getElementById('scAccess').style.display = 'block';
    console.log ("no hay un usuario");
  }
}

//const userStatus = userStatusValidation()
//console.log (userStatus);
displayElement(userStatusValidation());

btnGoogle.addEventListener('click', async () => {
  const user = await loginWithGoogle();
  displayElement(user);
});

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', async () => {
  // llamar funcion validar correo nuevo (correo, email)
  const email = document.getElementById('txtMail').value;
  const password = document.getElementById('txtPass').value;
  //  console.log(email, password);
  // console.log(userCredential);
  const resultNewUser = registerNewUser(email, password);
  //console.log(resultNewUser);
  /*if (!resultNewUser) {
    document.getElementById('scWelcome').style.display = 'block';
    document.getElementById('scAccess').style.display = 'none';
  } else {
    document.getElementById('scWelcome').style.display = 'none';
    document.getElementById('scAccess').style.display = 'block';
  }*/
});

const logout = document.getElementById('btnLogout');
logout.addEventListener('click', async () => {
  // await signOut(auth);
  logOutFunction();
  displayElement("");
  /*document.getElementById('scWelcome').style.display = 'none';
  document.getElementById('scAccess').style.display = 'block';
  console.log('sesion cerrada');*/
});

// btnLogin
const loginWithMail = document.getElementById('btnLogin');
loginWithMail.addEventListener('click', async () => {
  const email = document.getElementById('txtMail').value;
  const password = document.getElementById('txtPass').value;
  const dataReturn = emailLogin(email, password);
  let value1 

  // Promise.resolve(dataReturn).then((value) => alert (value));
  await Promise.resolve(dataReturn).then((value) => {
    // alert(value);
    value1 = value;
    console.log (value1);
    if (value1.indexOf('@') >= 0) {
      console.log (value1.indexOf("@"));
        displayElement("user");
    } else {
        displayElement("");
        alert(value1)  
    }
    //alert(value1);
  });
});
