<p align='left'>
    <img height="100" width="100" src='https://www.clarin.com/static/CLAClarin/images/Clarin-sahreing-fbk.png' </img>
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

El boilerplate cuenta con dos carpetas: `server` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `server` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
apikey=APIKEY
DB_USER=usuarioDeMySQL
DB_PASS=passwordDeMySQL
DB_HOST=localhost
DB_DATABASE=nombreDeBasedeDatos
```

Reemplazar `usuarioDeMySQL`, `passwordDeMySQL` y `nombreDeBasedeDatos` con tus propias credenciales para conectarte a mysql. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego debera ser incluida en todos los request que hagamos a esta simplemente agregando `?key={apikey}` al final de cada endpoint. Agregar la clave en el archivo `.env` para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí.

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

# __Una vez terminado todos estos pasos podemos hacer npm install tanto en client como server y luego npm start y podemos comenzar a disfrutar la aplicacion.__

#### Tecnologías usadas:
- [ ] React
- [ ] Express
- [ ] MySQL

Espero que les guste y lo disfruten tanto como yo lo hice al hacerlo.

Muchas gracias!