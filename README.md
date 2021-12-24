<p align='left'>
    <img height="100" width="100" src='https://www.clarin.com/static/CLAClarin/images/Clarin-sahreing-fbk.png'</img>
</p>

# Clarin Challenge - Full Stack Developer 

## Objetivos del Proyecto

- Construir una App que compare dos valores de SEO entre dos sitios.
- Procesar dos urls con la API de google (Pagespeed) y comparar los datos de Speed Index y Time to Interactive
- Crear un Frontend donde se puedan ingresar las dos urls a comparar y que muestre los valores obtenidos en el backend en forma de tabla comparativa.

## Comenzando

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas.
 2. Clonar el repositorio en sus computadoras para comenzar a trabajar.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuarioDeMySQL
DB_PASS=passwordDeMySQL
DB_HOST=localhost
DB_DATABASE=nombreDeBasedeDatos
```

Reemplazar `usuarioDeMySQL`, `passwordDeMySQL` y `nombreDeBasedeDatos` con tus propias credenciales para conectarte a mysql. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde mysql una base de datos llamada `clarin` o como deseen.

#### Base de datos

El modelo de la base de datos las cree con las siguientes entidades:

- [ ] url_stats:
  - id pk
  - name 
  - speed (Speed-Index)
  - time (Time-to-Interactive)
- [ ] comparison:
  - id pk
  - id_url_1 fk
  - id_url_2 fk

El contenido de `client` fue creado usando: Create React App.

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego debera ser incluida en todos los request que hagamos a esta simplemente agregando `?key={apikey}` al final de cada endpoint. Agregar la clave en el archivo `.env` para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí.

Una vez que terminamos de crear la base de datos y cambiar el .env podemos hacer npm install tanto dentro de client como de server y luego npm start en ambas y podemos comenzar a disfrutar la aplicacion.

#### Tecnologías usadas:
- [ ] React
- [ ] Express
- [ ] MySQL

#### Backend

En la parte de back se creo una api donde se hace una peticion get con las urls en params.
con estas url se hace la consulta a la API de google y una vez con esas promesas se generan las queries para insertar en la base de datos la informacion obtenida.
Tenemos una funcion dentro de este bloque llamada 'setIds' la cual nos permite guardar los ids de las url que insertamos en nuestra talba de 'url_stats' y asi poder crear otra querie insertando los ids en la tabla de comparison que nos ayuda con el historial de las comparaciones realizadas.
Teniendo las promesas de las queries enviamos los valores de estas al front.

Por otra parte tambien tenemos el endpoint history que nos permite enviar al front todo el historial concatenando tanto la tabla de comparison con la informacion de cada url.

