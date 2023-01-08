'use strict'

const express= require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncios');

//PETICION GET /api/agentes
//Devuelve la lista de anuncios sin filtros
router.get('/', async(req, res, next)=>{

    try {
        //FILTROS
        const name= req.query.name;
        const price=req.query.price  || "";
        const sale = req.query.sale;
        const tags = req.query.tags || "";

        //PAGINACION 
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        
        
        

        // Patrones de cadena para query param price
        let patPreIgual = /\d/;
        let patPreMenor = /-\d/;
        let patPreEntre = /\d-\d/;
        let patPreMayor = /\d-/;
        
        const filtro = {};

        
        if (name) {
            filtro.name = {$regex: new RegExp("^" + name + ".*", "i")};
        }

        if (sale) {
            filtro.sale = sale;
        }
    
        if (price !== "") {
            const extPrice = price.split("-");        
            if (patPreEntre.test(price)) {
                if (parseInt(extPrice[0]) >= parseInt(extPrice[1])){                        
                    res.status(422).json({success: false, error:"El primero parámetro del rango de price debe ser menor"});                                            
                    return;
                }
                filtro.price = { "$gte": extPrice[0], "$lte": extPrice[1] };                
            } else if (patPreMayor.test(price)) {
                filtro.price = { "$gte": extPrice[0] };
                console.log("arma price mayor -->", filtro.price);
            } else if (patPreMenor.test(price)) {                
                filtro.price = { "$lte": parseInt(extPrice[1]) };
                console.log("arma price menor -->", filtro.price);
            } else if (patPreIgual.test(price)) {
                filtro.price = parseInt(extPrice[0]);
                console.log("arma price a igual-->", filtro.price);
            }
        }

        if (tags !== "") {                    
            const extTags = tags.split(" ");     
            filtro.tags = {  "$in": extTags };            
        }

        

        const anuncios = await Anuncio.lista(filtro,skip, limit);
        res.json({results: anuncios});
    } catch(err){
        next(err);
    }
});




/**
 * Anuncio.find((err, anuncios) => {
    console.log('esto es la base de datos:',anuncios);
})
 */
  
router.get("/tags", async (req, res, next) => {
    try {
        const tagList = await Anuncio.list_of_Tags();
        res.json({ success: true, results: tagList });
    } catch (err) {
        next(err);
    }
});

router.get('/images/anuncios/bici.png', async (req, res, next)=>{
    
})
 


module.exports= router;