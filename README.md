# NODEAPP

Para iniciar se ha instalado nodemon el cual permite arrancar la aplicación con un comando sencillo.
Pero que a su vez de le han instalado todas sus dependencias y se ha modificado para que pueda funcionar en cualquier tipo de sistema operativo.
```sh
npm run dev 
```

Para actualizar, mostrar o realizar modificaciones a los datos iniciales de la base de datos, se ha creado el script init-db.js, el cual se inicia con el siguiente comando:
```sh
npm run init-db 
```
# DOCUMENTACION DE LA API

Modelos de llamada de nuestra api

```sh
http://localhost:3000/api/anuncios/tags
```
```sh
http://localhost:3000/api/anuncios?name=iphone
http://localhost:3000/api/anuncios?sale=true 
http://localhost:3000/api/anuncios?price=-200

```

Para mostrar la lista de anuncios se ejecuta: 
```sh
http://localhost:3000/api/anuncios
```

Para mostar el array de tags de ejecuta:
```sh
http://localhost:3000/api/anuncios/tags
o por filtro
http://localhost:3000/api/anuncios?tags=mobile
```