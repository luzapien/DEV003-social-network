# Social Network

## Índice
* [1. Introducción](#1-introducción)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Objetivos Generales del Proyecto](#3-objetivos-generales-del-proyecto)
* [4. Historias de Usuario](#4-historias-de-usuario)
* [5. Prototipos Baja Fidelidad](#5-prototipos-baja-fidelidad)
* [6. Prototipos Alta Fidelidad](#6-prototipos-alta-fidelidad)
* [7. Áreas de Mejora](#7-áreas-de-mejora)
* [8. Test de Usabilidad](#8-tests-de-usabilidad)
* [9. Boiler Plate](#9-boiler-plate)
* [10. Checklist](#10-checklist)


## 1. Introducción
Hay redes sociales de todo tipo y para todo tipo de intereses. Pero en nuestra busqueda no encontramos una enfocada en las personas que gustan de los gatos, a pesar de haber tanto contenido en redes dedicado a este ejemplar. Por esta razón, decidimos aprovechar la oportunidad y enfocar nuestro proyecto a la creación de una red social, para todos los Cat Lovers.

## 2. Resumen del proyecto

En este proyecto decidimos construir una Red Social para las personas que aman a los gatos. Realizamos un sondeo entre nuestros conocidos y les pareció interesante la idea de poder tener una red social donde puedan compartir desde curiosidades, tips, videos, entre otras cosas, hasta publicaciones sobre adopción responsable.

La Red Social permite a los usuarios acceder con su cuenta de Google y permite el registro con un correo electrónico, para que de tal manera pueda acceder con el mismo, mediante un password definido por el usuario. Una vez el usuario se encuentra logueado puede crear, editar, borrar, comentar y darle o quitarle like a sus publicaciones. [Aquí puedes visitar nuestro proyecto.](https://chrisolivos.github.io/DEV003-social-network/ "Aquí puedes visitar nuestro proyecto.")

## 3. Objetivos generales del proyecto
Los objetivos generales fueron los siguientes:

- [x] Desarrollar una SPA con temática de red social.
- [x] Aplicar los conceptos de responsividad en el desarrollo de las vistas (templates).
- [x] Implementar un router para la navegación entre las diferentes vistas de la aplicación.
- [x] Emplear un servicio externo para la persistencia de datos de la aplicación (firebase).
- [x] Crear una suite de pruebas unitarias que permitan testear código asíncrono (jtest).

## 4. Historias de Usuario

Dividimos nuestro proyecto en tres historias de usuario:

### Historia 1:
*Como:*  usuario de redes sociales.

*Quiero:*  registrarme y acceder de forma segura a la aplicación ya sea con Google u otro correo.

*Criterios de Aceptación:* La página debe permitir la autenticación con una cuenta de Google. También debe permitir registrar sus datos, tales como: Nombre, Apellido, correo y contraseña para que pueda acceder con cualquier correo electrónico.

*Definición de terminado*: Que el usuario pueda loguearse con su cuenta de google o le permite registrarse con otro correo para que pueda ingresar.

### Historia 2:
*Como:* usuario de la red social.

*Quiero:* poder publicar en mi muro, poder visualizar todas mis publicaciones, así como poder editarlas o eliminarlas.

*Criterios de Aceptación:* La página debe permitir al usuario poder realizar publicaciones, editarlas y eliminarlas. También deberá permitir que pueda ver todas las publicaciones propias que hizo. Se le debe pedir una confirmación al usuario antes de eliminar una publicación.

*Definición de terminado:* Que el usuario pueda hacer publicaciones, ver todas sus publicaciones, editarlas, y eliminarlas.

### Historia 3:
*Como:* Usuario de la red social.

*Quiero:* poder dar o quitar like a mis publicaciones y comentar mis publicaciones.

*Criterios de Aceptación:* La página debe permitir al usuario poder dar o quitar el like a sus publicaciones y también debe poder realizar comentarios sobre sus publicaciones.

*Definición de terminado:* El usuario debe poder dar like a sus publicaciones o quitárselo con un click, se debe mostrar de manera inmediata la cantidad de likes en cada publicación y también debe poder hacer comentarios sobre cada una de sus publicaciones y estos deben actualizarse y mostrarse en tiempo real.

## 5. Prototipos Baja Fidelidad
Los prototipos de baja fidelidad se crearon con lápiz y papel en primera instancia.
Imágenes del Prototipo de Baja Fidelidad:

![Prototipo de baja fidelidada: Login](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/Prototipos/PrototipoLogin.jpg)

![Prototipo de baja fidelidada: Post](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/Prototipos/PrototipoPost.jpg)


## 6. Prototipos Alta Fidelidad
Desarrollamos prototipos de cada vista, implementándolos en mobile first, esto lo hicimos con la herramienta de Figma. [Aquí puedes acceder al prototipo.](https://www.figma.com/proto/SpAk0S6RastCojzJzc56Gc/CatsLover?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A2 "Aquí puedes acceder al prototipo.")

## 7. Áreas de mejora
Al realizar los tests nos dimos cuenta que teníamos que reestructurar el código de algunas de nuestras funciones.

También observamos que podemos mejorar en la nomenclatura de nuestras funciones y variables para que nuestro código sea más comprensible.

Así mismo, en el diseño hemos observado que debemos profundizar aún más para llegar al prototipo planteado, y poder obtener un mejor resultado visual  y una experiencia de usuario más agradable.

## 8. Tests de usabilidad
Se implementaron tests de usabilidad al concluir cada historia de usuario.
En la última historia de usuario, se realizaron los tests de usabilidad apoyándonos de un formulario, con el cual obtuvimos un feedback más claro y logramos analizar mejor los puntos de observados.

Los resultados que obtuvimos de estos últimos test fueron los siguientes:

![Test de usabilidad: Pregunta1](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta1.png)

![Test de usabilidad: Pregunta2](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta2.png)

![Test de usabilidad: Pregunta3](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta3.png)

![Test de usabilidad: Pregunta4](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta4.png)

![Test de usabilidad: Pregunta5](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta5.png)

![Test de usabilidad: Pregunta6](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta6.png)

![Test de usabilidad: Pregunta7](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta7.png)

![Test de usabilidad: Pregunta8](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta8.png)

![Test de usabilidad: Pregunta9](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta9.png)

![Test de usabilidad: Pregunta10](https://github.com/chrisolivos/DEV003-social-network/blob/9f5fb686fd2156ab54d022f974238508ecb3d829/src/Images/TestUsabilidad/Pregunta10.png)

### Resultados de los Test de Usabilidad
Resultado del feedback recibido:
* Mayor claridad sobre la iconografía (agregar texto)
* Sustituir los alerts por ventanas más amigables visualmente.
* Utilizar el botón original de Google para el logueo

## 9. Boiler Plate

├── src

|   ├── Component

|   |  ├──  Comments.js

|   |  ├──  Dialog.js

|   |  ├──  Login.js

|   |  ├──  Home.js

|   |  ├──  ModalError.js

|   |  ├──  Register.js

|   ├── css

|   |   ├── comments.css

|   |   ├── style.css

|   ├── lib

|   |   ├── configFirebase.js

|   |   ├── createUserID.js

|  |    ├── firebase.js

|  |    ├── functions_post.js

|  └── index.html

|  └── main.js

|  └── router.js

└── test

|   └── Home.spec.js

|   └── Login.spec.js

|   └── register.spec.js

├── README.md


## 10. Checklist

- [x] HTML
- [x] CSS
- [x] Web APIs
- [x] JavaScript
- [x] Control de Versiones (Git y GitHub)
- [x] Centrado en el usuario
- [x] Diseño de producto
- [x] Investigación
- [x] Firebase

