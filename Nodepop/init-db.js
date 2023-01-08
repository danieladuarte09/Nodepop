//INICIALIZAR LA BASE DE DATOS CON LOS DATOS MINIMOS PARA FUNCIONAR

const readline = require('readline');


//cargamos los modelos que se van  a usar
const Anuncio= require('./models/Anuncios');

async function main(){
    //preguntar al usuario si esta seguro??
    const continuar = await  preguntaSiNO('¿Estas seguro, que quieres borrar la base de datos?')
    if (!continuar){
        process.exit();
    }

    //Conectar a la base de datos
    const connection= require('./lib/connectMongoose')

    //inicializar la coleccion de agentes 
    await initAnuncios();

    //desconectamos de la base de datos
    connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncios(){
    //borrar todos los documentos de la coleccion de anuncios
    const result= await Anuncio.deleteMany();
    console.log(`Eliminados ${result.deletedCount} agentes.  `);

    //crear anuncios iniciales
    const inserted= await Anuncio.insertMany([

        {
            name : "cama",
            sale : true,
            price : 170,
            picture : "cama.jpg",
            tags : [ "lifestyle" ]
        },
        
        /* 2 createdAt:7/1/2023 15:18:47*/
        {
            name : "escritorio",
            sale : false,
            price : 150,
            picture : "escritorio.jpg",
            tags : [  "work" ]
        },
        
        /* 3 createdAt:7/1/2023 15:17:42*/
        {
            name : "pesas",
            sale : true,
            price : 80,
            picture : "pesas.jpg",
            tags : [ "lifestyle" ]
        },

        {
            name: 'Bicicleta',
            sale: true,
            price: 35,
            picture: 'bici.png',
            tags: [ 'lifestyle', 'motor' ]
          },
          {
            
            name: 'iphone 14',
            sale: false,
            price: 1000,
            picture: 'iphone.jpg',
            tags: [ 'lifestyle', 'mobile' ]
          },
          {
            
            name: 'cámara profesional',
            sale: true,
            price: 600,
            picture: 'camara.jpg',
            tags: [ 'mobile', 'work' ]
          }
    ]);
    console.log(`Insertados ${inserted.length} agentes` )
}

function preguntaSiNO(texto){
    return new Promise((resolve, reject)=> {
        const interface= readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(texto, respuesta => {
            interface.close(); 
            if (respuesta.toLowerCase() === 'si'){
                resolve(true);
                return; 
            }
            resolve(false);
        })
    })
}



