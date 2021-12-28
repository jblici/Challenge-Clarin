<p align='left'>
    <img height="100" width="100" src='https://www.clarin.com/static/CLAClarin/images/Clarin-sahreing-fbk.png' </img>
</p>

# Clarin Challenge - Full Stack Developer 

Lamentablemente me tope con un problema de Heroku que tiene un timeout el cual no permite que el http request supere los 30 segundos, es por eso que presento estas opciones.

# 3 Opciones para probar la App

# __#1 Local (Pasos para correr App)__

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

#### Correr script

```
CREATE SCHEMA `clarin` ;

CREATE TABLE `clarin`.`url_stats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `speed` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `clarin`.`comparison` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_url_1` INT NOT NULL,
  `id_url_2` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_url_1_idx` (`id_url_1` ASC) VISIBLE,
  INDEX `id_url_2_idx` (`id_url_2` ASC) VISIBLE,
  CONSTRAINT `id_url_1`
    FOREIGN KEY (`id_url_1`)
    REFERENCES `clarin`.`url_stats` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_url_2`
    FOREIGN KEY (`id_url_2`)
    REFERENCES `clarin`.`url_stats` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
```

## __Una vez terminado todos estos pasos podemos hacer npm install tanto dentro de client como server, luego npm start en ambos a disfrutar la aplicacion.__

# __#2 Client Local Back Heroku__ 

En `client` solamente reemplazar en la linea 41 y 45 el endpoint https://clarin-challenge.herokuapp.com por https://localhost:3001

Luego correr npm install y start en la carpeta client. Esta opcion hay veces que no supera los 30 segundos y funciona correctamente. 


# __#3 APP DEPLOYED: https://react-clarin.vercel.app/ con Back Heroku https://clarin-challenge.herokuapp.com__

Espero que les guste y lo disfruten tanto como yo lo hice al hacerlo.

Muchas gracias!