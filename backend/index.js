'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3702; 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/adoo')
    .then(()=>{
        console.log("Conexión a la base de datos establecida con satisfactoriamente");

        //Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3702");
        });
    })
    .catch(err => console.log(err));
