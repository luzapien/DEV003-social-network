const views = {
  login: `
    <section id="scAccess">
      <div class="email">
        <label>Correo:</label><br>
        <input type="text" id="txtMail" autocomplete="off" placeholder="Ingresa tu correo"><br>
      </div>
      <div class="password">
        <label>Contraseña:</label><br>
        <input type="password" id="txtPass" autocomplete="off" placeholder="Ingresa tu Contraseña"><br>
      </div>
      <div class="buttons">
        <button class="btnsLogIn" id="btnRegister">Registrar</button>
         <button class="btnsLogIn" id="btnLogin">Ingresar</button><br>
         <img src="./Images/googleBtn.png" width="100%" height="100%" id="btnGoogle">
      </div> 
    </section>
    `,
  welcome: `
    <section id="scWelcome">
       Bienvenido a CatsLover<br>
      <button class="btnsLogIn" id="btnLogout">Cerrar Sesion</button>
    </section>
    `,
};
export default views;
