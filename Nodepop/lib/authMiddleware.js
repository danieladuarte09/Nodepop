'use strict'

//cargar liberia para proteger el api

const basicAuth = require('basic-auth')

//exportamos

module.exports = (req, res, next)=>{
    const usuario= basicAuth(req);

    //buscar en la bd el usuario y comprobar sus credenciales 

    if(!usuario || usuario.name != 'admin' || usuario.pass!== '1234'){
        res.set('WWW-authenticate', 'Basic realm=Authorization required');
        res.sendStatus(401);
        return;
    }
    next();
}