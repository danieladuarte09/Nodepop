'use strict'

const mongoose = require('mongoose');
//definir esquema de los anuncios

const list_of_tags = ["work", "lifestyle", "motor", "mobile"];

const anunciosSchema = mongoose.Schema({
    
    name: {type: String, unique: true},//---> para que cree un indice
    sale: { type: Boolean, index: true} ,
    price: {type: Number, index: true},
    picture: {type: String},
    tags: [{type: String, enum: list_of_tags}]
});

//METODO ESTATICO PARA FILTRAR Y MAS COSAS
anunciosSchema.statics.lista = function(filtro, skip, limit, fields, sort){
    const query = Anuncio.find(filtro); //esto devuelve la query sin ejecutar
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    
    return query.exec()//----> aqui si se ejecuta la queryy y se retorna la promesa

}

function tagList(){
    const query = Anuncio.find().distinct("tags");
    return query.exec();
}


//crear modelo
const Anuncio= mongoose.model('Anuncio', anunciosSchema);

//exportar el modelo

module.exports = Anuncio;
module.exports.list_of_Tags = tagList;

