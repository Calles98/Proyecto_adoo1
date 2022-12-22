'use strict'

var Diploma = require('../models/diploma');
var fs = require('fs'); 
var path = require('path'); 
const { restart } = require('nodemon');

var controller = {
    saveDiploma: function(req, res){
        var diploma = new Diploma(); 
        var params = req.body;
         diploma.name  = params.name;
         diploma.lastName = params.lastName;
         diploma.eventName = params.eventName; 
         diploma.image = null;  

        

        diploma.save((err, diplomaStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar'}); 

            if(!diplomaStored) return res.status(404).send({message: 'No se ha podido guardar el evento'});

            return res.status(200).send({diploma: diplomaStored});
        });
     },

     getDiploma: function(req, res){
        var diplomaId = req.params.id; 

        if(diplomaId == null) return res.status(404).send({message: 'El diploma no existe'});

        Diploma.findById(diplomaId, (err, diploma)=>{
            if(err) return res.status(500).send({message: 'Error al cargar los datos'});

            if(!diploma) return res.status(404).send({message: 'El diploma no existe'});

            return res.status(200).send({diploma});
        });
     },

     updateDiploma: function(req, res){
        var diplomaId = req.params.id;
        var update = req.body; 

        Diploma.findByIdAndUpdate(diplomaId, update, {new:true}, (err, diplomaUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!diplomaUpdate) return res.status(404).send({message: 'El diploma no existe'});

            return res.status(200).send({diploma: diplomaUpdate});
        });
     },

     uploadImage: function(req, res){
        var diplomaId = req.params.id;
		var fileName = 'Imagen no subida...';
       
        if(req.file){
            console.log(req.file);
            var filePath = req.file.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = req.file.originalname.split('.');
           
            var fileExt = extSplit[1];

           
			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Diploma.findByIdAndUpdate(diplomaId, {image: fileName}, {new: true}, (err, diplomaUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!diplomaUpdated) return res.status(404).send({message: 'El diploma no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						diploma: diplomaId
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}
     },

     getImage: function(req, res){
        var file = req.params.image; 
        var path_file = './uploads/'+file;
        
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }

        });

     }
}

module.exports = controller;