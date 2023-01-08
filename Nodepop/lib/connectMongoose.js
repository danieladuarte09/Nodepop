'use strict'
//CONEXION DE LA APLICACION A MONGODB

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

/**
 * CONTROLADORES
 */
//si pierde la conexion con la base de datos, paramos la conexion para que no de error
mongoose.connection.on('error', err=> {
    console.log('Error de conexion a MongoDB', err);
    process.exit(1);
});

//cada vez que ocurra un evento open, (se establezca una nueva conexion)
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name)

})

//conctarse a la BD
mongoose.connect('mongodb://127.0.0.1/Nodepop')

//EXPORTAR LA CONEXION
module.exports=mongoose.connection;