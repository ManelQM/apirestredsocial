# FaceBook Clone - Social Network - Backend - API REST - MVC 

## Resumen 

FaceBook Clone es un proyecto donde se desarrolla la tecnología para implementar el software de una ficticia red social. Teniendo siempre en cuenta las necesidades vinculadas a la lógica de negocio a este tipo de apliaciones, los usuarios podrán realizar todas las acciones propias a las redes sociales. 

Por otro lado este proyecto pretende mostrar las habilidades a la hora de adentrarse con otro tipo de frameworks como MongoDB o librerías y dependencias que antes no había utilizado como Multer, Validator,Moment, etc. 

## Objetivos 
Creación de la infraestructura de software necesaria para la interfaz de una red social  con un diseño escalable y mantenible, centrándose en bases de datos, lógica del lado del servidor, interfaz de programación de aplicaciones (APIs), arquitectura y servidores.

Para ello implementaremos el modelo vista controlador(MVC) como patrón de diseño ofreciendo la creación de un software que tenga en cuenta no solo la arquitectura de código, sino también la lógica intríseca a la naturaleza de un red social.  

## Tecnologías
Las tecnologías usadas para el desarrollo de la funcionalidad general de la app, son las siguientes; 

![JS](./img/logo-javascript-logo-png-transparentj.png)&nbsp;&nbsp;&nbsp; 
![NODE](./img/nodejs-horizontal%20(1).svg)
![EXPRESS](./img/expressjs-ar21%20(1)%20(1).svg)&nbsp;&nbsp;
![JWT](./img/icons8-json-web-token-48.png)

![MONGOCOMPASS](./img/mongodb-compass.svg)&nbsp;&nbsp;&nbsp;&nbsp;
![MONGODB](./img/MongoDB_ForestGreen-159x40-9f64cd3.png)
![MONGOOSE](./img/Mongoose.js%20(2).png)

### Node.js
Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Google Chrome. Permite ejecutar código JavaScript en el lado del servidor, lo que lo hace ideal para el desarrollo de aplicaciones web y APIs. Algunas de sus características son:

* JavaScript en el Servidor: Node.js permite utilizar JavaScript tanto en el lado del cliente como en el servidor, lo que simplifica el desarrollo de aplicaciones web completas con un solo lenguaje de programación.
* Event-Driven y Asíncrono: Node.js utiliza un modelo de programación event-driven y asíncrono, lo que significa que puede manejar múltiples solicitudes concurrentes de manera eficiente sin bloquear el subproceso principal.
* NPM (Node Package Manager): Node.js incluye NPM, un administrador de paquetes integrado que permite instalar, administrar y compartir paquetes de código reutilizable de manera sencilla.
* Escalabilidad: Node.js es altamente escalable y puede utilizarse para construir aplicaciones de alta concurrencia y rendimiento, lo que lo hace popular en aplicaciones web en tiempo real y APIs RESTful.

### Express
Express es un marco de aplicación web de Node.js que simplifica el desarrollo de aplicaciones web y APIs. Algunas de sus características son:

* Enrutamiento: Express proporciona un enrutador flexible que permite definir rutas para manejar solicitudes HTTP y responder con contenido dinámico.
* Middleware: Permite la integración de middleware de terceros para agregar funcionalidades adicionales, como manejo de cookies, autenticación y registro de solicitudes.
* Manejo de Solicitudes y Respuestas: Express facilita el manejo de solicitudes y respuestas HTTP mediante métodos y funciones integradas, lo que simplifica la creación de aplicaciones web y APIs robustas.

### MongoDB
MongoDB es una base de datos NoSQL que se basa en un modelo de documentos flexible y escalable. Utiliza un formato de almacenamiento JSON similar a los objetos JavaScript, lo que facilita la integración con aplicaciones desarrolladas en JavaScript. Algunas de sus características principales son:

* Esquema Flexible: A diferencia de las bases de datos relacionales, MongoDB no requiere un esquema fijo, lo que permite adaptarse fácilmente a cambios en los requisitos de datos.
* Escalabilidad Horizontal: MongoDB es altamente escalable y puede distribuirse en múltiples servidores para manejar grandes volúmenes de datos y altas cargas de trabajo.
* Consultas: MongoDB ofrece consultas flexibles y potentes que admiten una variedad de operaciones de consulta, incluidas consultas de rango, búsqueda de texto completo y agregaciones.

### Mongoose
Mongoose es una biblioteca de modelado de objetos MongoDB para Node.js que proporciona una capa de abstracción sobre la base de datos MongoDB. Algunas de sus características son:

* Esquemas y Modelos: Mongoose permite definir esquemas de datos estructurados y crear modelos basados en estos esquemas, lo que facilita la interacción con la base de datos.
* Validación de Datos: Proporciona funciones de validación de datos integradas para garantizar que los datos ingresados cumplan con los requisitos especificados.
* Consultas Asíncronas: Mongoose admite consultas asíncronas que aprovechan las características de JavaScript asincrónico y permiten realizar operaciones de base de datos de manera eficiente.

### Mongo Compass
MongoDB Compass es una interfaz gráfica de usuario (GUI) para MongoDB que permite visualizar y manipular datos de manera intuitiva. Algunas de sus características son:

* Exploración de Datos: Compass permite explorar fácilmente las colecciones de la base de datos, ver documentos individuales y ejecutar consultas ad hoc.
* Visualización de Esquemas: Proporciona una vista gráfica de los esquemas de la base de datos, lo que facilita la comprensión de la estructura de los datos.
* Creación de Consultas: Permite construir consultas utilizando una interfaz visual y ver los resultados en tiempo real.

### Bcrypt
Bcrypt es una biblioteca que proporciona funciones de hashing de contraseñas seguras para proteger las contraseñas almacenadas en tu base de datos. Utiliza un algoritmo de hashing adaptativo que agrega una capa adicional de seguridad al generar un hash de la contraseña del usuario. Algunas de sus características principales son:

* Seguridad Robusta: Bcrypt utiliza un algoritmo de hashing lento y deliberadamente intensivo en recursos, lo que lo hace altamente resistente a los ataques de fuerza bruta y de diccionario.
* Salting Automático: Bcrypt incorpora automáticamente un valor de sal único en cada hash de contraseña que genera. Esto previene ataques de tabla arcoíris y hace que cada hash sea único, incluso si las contraseñas son idénticas.
* Facilidad de Uso: Bcrypt proporciona una interfaz simple para generar y verificar contraseñas hash, lo que facilita su integración en tus aplicaciones.
* Escalabilidad: Aunque es lento a propósito, Bcrypt sigue siendo lo suficientemente rápido como para escalar en aplicaciones de producción sin afectar significativamente el rendimiento del servidor.

### JWT (JSON Web Token)
JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre partes como un objeto JSON. Es especialmente útil en entornos de autenticación y autorización, ya que permite generar tokens firmados que pueden ser verificados y confiables, lo que garantiza la integridad de los datos transmitidos. En esta API, JWT se utiliza para la autenticación de usuarios, proporcionando una capa adicional de seguridad al proteger las rutas y recursos sensibles.


### Multer
Multer es un middleware de manejo de formularios para Node.js que se utiliza principalmente para el manejo de archivos en aplicaciones web. Permite procesar datos de formulario en formato multipart/form-data, que es comúnmente utilizado para la carga de archivos. En esta API, Multer facilita la gestión de archivos multimedia, como imágenes o documentos, permitiendo a los usuarios cargar y almacenar archivos de manera segura y eficiente.

### Validator
Validator es una librería de validación de datos para JavaScript y Node.js que ofrece una forma sencilla y robusta de validar y sanear datos de entrada en aplicaciones web y API RESTful. Proporciona una serie de funciones y métodos para verificar la integridad y el formato de los datos, como la validación de correos electrónicos, números de teléfono, URL, etc. En esta API, Validator se utiliza para garantizar que los datos proporcionados por los usuarios cumplan con los requisitos y restricciones establecidos, mejorando así la seguridad y la fiabilidad de la aplicación.

### Arquitectura de funciones asíncronas
La arquitectura de funciones asíncronas en esta API aprovecha las capacidades de JavaScript y Node.js para manejar tareas no bloqueantes de manera eficiente. Al utilizar funciones asíncronas y el sistema de promesas de JavaScript, la API puede realizar operaciones de E/S (entrada/salida), como consultas a la base de datos o la lectura de archivos, de manera no bloqueante, lo que mejora la escalabilidad y la capacidad de respuesta del sistema. Esto permite manejar múltiples solicitudes simultáneas de manera eficiente, optimizando el rendimiento y la experiencia del usuario.

## Arquitectura BBDD

La base de datos en MongoDB está diseñada para ofrecer una estructura flexible y escalable, adaptada a las necesidades del negocio. Aunque no sigue un modelo relacional, su organización permite un control eficiente de las consultas y peticiones realizadas por los usuarios. La estructura se adapta a la lógica de negocio, proporcionando un registro completo de los datos necesarios para gestionar la plataforma, incluyendo información sobre usuarios registrados, publicaciones, relaciones de seguimiento, y otros elementos relevantes para el funcionamiento de la aplicación.

![DB](./img/Blank%20diagram.png)
 
## Lista de funcionalidades

### Funcionalidades del Usuario

- **POST /register**: Registrar un nuevo usuario.
- **GET /login**: Iniciar sesión de usuario.
- **GET /profile/:id**: Obtener perfil de usuario por ID.
- **GET /userslist/:page?**: Obtener lista de todos los usuarios (paginación opcional).
- **PUT /update**: Actualizar perfil de usuario.
- **POST /uploadavatar**: Subir imagen de avatar de usuario.
- **GET /getavatar/:file**: Obtener imagen de avatar de usuario por nombre de archivo.

### Funcionalidades de Publicaciones

- **POST /createpublication**: Crear una nueva publicación (requiere autorización).
- **GET /getpublication/:id?**: Obtener una publicación por ID (requiere autorización).
- **DELETE /deletepublication/:id?**: Eliminar una publicación por ID (requiere autorización).
- **GET /getpublicationsuser/:id?**: Obtener todas las publicaciones de un usuario por ID (requiere autorización).
- **POST /uploadimg/:id?**: Subir imagen a una publicación por ID (requiere autorización).
- **GET /media/:file**: Obtener archivo multimedia de una publicación por nombre de archivo (requiere autorización).
- **GET /feed/:page?**: Obtener el feed de publicaciones (paginación opcional, requiere autorización).

### Funcionalidades de Seguimiento de Usuarios

- **POST /followuser**: Seguir a un usuario (requiere autorización).
- **DELETE /unfollow/:id**: Dejar de seguir a un usuario por ID (requiere autorización).
- **GET /following/:id?/:page?**: Obtener usuarios seguidos por un usuario por ID (opcional: paginación, requiere autorización).
- **GET /followed/:id?/:page?**: Obtener seguidores de un usuario por ID (opcional: paginación, requiere autorización).


# English version 

