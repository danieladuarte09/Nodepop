'use strict'

//cargar liberia Express
const express = require('express')

//crear la aplicación
const app=express();

app.use((req, res, next) => {
    console.log('nueva petición');
    next();
})

//añadir manejador de rutas(middleware)
app.get('/', (req, res, next) => {
    console.log('recibo una petición de tipo', req.method, 'a', req.path);
    res.send('hola soy la practica');//respuesta
})

app.get('/pedidos', (req, res, next) => {
    console.log('página de pedidos')
    res.send('Página de pedidos')
})

//arrancar la aplicación

app.listen(8080, ()=> {
    console.log('Servidor arrancado en http://localhost:8080');
});