[![Build Status](https://travis-ci.org/alu0100825893/localstorage-jquery-underscore-express-sass-heroku-equipo-com.svg?branch=gh-pages)](https://travis-ci.org/alu0100825893/localstorage-jquery-underscore-express-sass-heroku-equipo-com)

# ETSII ULL Grado de Informatica

* [Página en Github Carlos](https://ctc87.github.io/)
* [Página en Github Oscar](https://alu0100825893.github.io/)
* [Página en Github Miguel](https://alu0100886870.github.io/)
* [Página de la asignatura PL Carlos](http://ctc87.github.io/Practicas_PL/)
* [Página de la asignatura PL Oscar](https://alu0100825893.github.io/)
* [Página de la asignatura PL Miguel](https://alu0100886870.github.io/pl.html)
* [Repositorio](https://github.com/ULL-ESIT-GRADOII-PL/mongodb-mongoose-csv-equipo-com)
* [Fork-Con los Issues](https://github.com/alu0100825893/mongodb-mongoose-csv-equipo-com)
* [DESPLIEGUE EN C9. Maquina](https://ide.c9.io/alu0100825893/ubuntu)

# Práctica PL.

#### CSV usando MongoDB
[Descripción de la práctica en el CV](https://campusvirtual.ull.es/1516/mod/page/view.php?id=191191)
<br/>[Página de la asignatura en el CV](https://campusvirtual.ull.es/1516/course/view.php?id=178)

<b>A los requesitos de la práctica anterior se le añaden:</b>

* Un botón guardar. Cuando se hace click en dicho botón se guarda la entrada actual en una base de datos MongoDB.
 * El contenido de la entrada actual se guarda con un nombre que se solicita previamente al usuario
 * Usaremos Mongoose para acceder a la base de datos
* Sólo se guardan hasta un límite de cuatro ejemplos en la Base de Datos. Cuando el número excede del límite se borra uno de los anteriores y se guarda la nueva entrada
* Al igual que en la práctica CSV usando Ajax habrán botones de selección de ejemplo.
 * Pondremos tantos botones como registros hay en la Base de Datos.
 * Al hacer click en uno de estos botones se carga el ejemplo con ese nombre desde la base de datos en la textarea de entrada
* Despliegue su aplicación en c9.io. En los enlaces de entrega (README.md y taller) especifique la URL de c9.io

# Instrucciones para ver el funcionamiento:
* Acceder a una máquina de c9
* Clonar el repositorio:  git clone https://github.com/alu0100825893/mongodb-mongoose-csv-equipo-com.git
* Instalar las dependencias: npm install
* Crear una carpeta "data": mkdir data
* En una terminal ejecutar: ./mongod
* En otra terminal ejecutar: node hello.js
* La aplicacion deberia estar corriendo en un enlace como el de abajo.
* https://nombreMaquina-nombreUsuario.c9.io/


# ENLACE A LA APLICACIÓN EN C9
##### [ENLACE A C9.io](https://ubuntu-alu0100825893.c9.io/)

# Notas sobre el funcionamiento:
* Si la base de datos no contiene ningun registro, al guardar se crear pero no se visualizan. Para visualizarlos refrescar la pagina de la aplicacion.
* Una vez hayan 4 resgistros en la base de datos, se visualizan sin tener que refrescar.