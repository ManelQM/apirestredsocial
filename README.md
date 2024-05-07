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


### JWT (JSON Web Token)
JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre partes como un objeto JSON. Es especialmente útil en entornos de autenticación y autorización, ya que permite generar tokens firmados que pueden ser verificados y confiables, lo que garantiza la integridad de los datos transmitidos. En esta API, JWT se utiliza para la autenticación de usuarios, proporcionando una capa adicional de seguridad al proteger las rutas y recursos sensibles.

### Multer
Multer es un middleware de manejo de formularios para Node.js que se utiliza principalmente para el manejo de archivos en aplicaciones web. Permite procesar datos de formulario en formato multipart/form-data, que es comúnmente utilizado para la carga de archivos. En esta API, Multer facilita la gestión de archivos multimedia, como imágenes o documentos, permitiendo a los usuarios cargar y almacenar archivos de manera segura y eficiente.

### Validator
Validator es una librería de validación de datos para JavaScript y Node.js que ofrece una forma sencilla y robusta de validar y sanear datos de entrada en aplicaciones web y API RESTful. Proporciona una serie de funciones y métodos para verificar la integridad y el formato de los datos, como la validación de correos electrónicos, números de teléfono, URL, etc. En esta API, Validator se utiliza para garantizar que los datos proporcionados por los usuarios cumplan con los requisitos y restricciones establecidos, mejorando así la seguridad y la fiabilidad de la aplicación.

### Arquitectura de funciones asíncronas
La arquitectura de funciones asíncronas en esta API aprovecha las capacidades de JavaScript y Node.js para manejar tareas no bloqueantes de manera eficiente. Al utilizar funciones asíncronas y el sistema de promesas de JavaScript, la API puede realizar operaciones de E/S (entrada/salida), como consultas a la base de datos o la lectura de archivos, de manera no bloqueante, lo que mejora la escalabilidad y la capacidad de respuesta del sistema. Esto permite manejar múltiples solicitudes simultáneas de manera eficiente, optimizando el rendimiento y la experiencia del usuario.

### Bcrypt
Bcrypt es una biblioteca que proporciona funciones de hashing de contraseñas seguras para proteger las contraseñas almacenadas en tu base de datos. Utiliza un algoritmo de hashing adaptativo que agrega una capa adicional de seguridad al generar un hash de la contraseña del usuario. Algunas de sus características principales son:

* Seguridad Robusta: Bcrypt utiliza un algoritmo de hashing lento y deliberadamente intensivo en recursos, lo que lo hace altamente resistente a los ataques de fuerza bruta y de diccionario.
* Salting Automático: Bcrypt incorpora automáticamente un valor de sal único en cada hash de contraseña que genera. Esto previene ataques de tabla arcoíris y hace que cada hash sea único, incluso si las contraseñas son idénticas.
* Facilidad de Uso: Bcrypt proporciona una interfaz simple para generar y verificar contraseñas hash, lo que facilita su integración en tus aplicaciones.
* Escalabilidad: Aunque es lento a propósito, Bcrypt sigue siendo lo suficientemente rápido como para escalar en aplicaciones de producción sin afectar significativamente el rendimiento del servidor.
  
## Arquitectura BBDD

La base de datos en MongoDB está diseñada para ofrecer una estructura flexible y escalable, adaptada a las necesidades del negocio. Aunque no sigue un modelo relacional, su organización permite un control eficiente de las consultas y peticiones realizadas por los usuarios. La estructura se adapta a la lógica de negocio, proporcionando un registro completo de los datos necesarios para gestionar la plataforma, incluyendo información sobre usuarios registrados, publicaciones, relaciones de seguimiento, y otros elementos relevantes para el funcionamiento de la aplicación.

![DB](./img/Blank%20diagram.png)
 
## Lista de funcionalidades




# English version 

