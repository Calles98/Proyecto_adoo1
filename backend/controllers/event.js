'use strict'

var Event = require('../models/event');
var fs = require('fs'); 
var path = require('path'); 
const { isBooleanObject } = require('util/types');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'home'
        });
    }, 

    test: function(req, res){
        return res.status(200).send({
            message: "Soy el método o acción test del controlador de project"
        });

    },

    saveEvent: function(req, res){
        var event = new Event(); 
        var params = req.body;
        event.name = params.name;
        event.professor = params.professor; 
        event.typeEvent = params.typeEvent;
        event.startDate = params.startDate; 
        event.endDate = params.endDate; 
        event.duration = params.duration; 
        event.participants = params.participants;
        event.aproved = params.aproved; 

        event.save((err, eventStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar'}); 

            if(!eventStored) return res.status(404).send({message: 'No se ha podido guardar el evento'});

            return res.status(200).send({event: eventStored});
        });
     },

     getEvent: function(req, res){
        var eventId = req.params.id; 

        if(eventId == null) return res.status(404).send({messsage: 'El evento no existe'}); 

        Event.findById(eventId, (err, event) => {
            if(err) return res.status(500).send({message: "Error al delvolver los datos"}); 

            if(!event) return res.status(404).send({message: 'El evento no existe'}); 

            return res.status(200).send({event});
        });
     },

     getEvents: function(req, res){
        Event.find({}).sort('typeEvent').exec((err, events) => {
            if(err) return res.status(500).send({message: "Error al delvolver los datos"}); 

            if(!events) return res.status(404).send({message: 'No hay Eventos para mostrar'}); 

            return res.status(200).send({events});
        });
     },

     updateEvent: function(req, res){
        var eventId = req.params.id; 
        var update = req.body; 

        Event.findByIdAndUpdate(eventId, update, {new:true}, (err, eventUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!eventUpdate) return res.status(404).send({message: 'No existe el evento'});

            return res.status(200).send({event: eventUpdate});
        });
     },

     deleteEvent: function(req, res){
        var eventId = req.params.id;

        Event.findByIdAndRemove(eventId, (err, eventRemoved) => {
            if(err) return res.status(500).send({message: 'No se ha podido borrar el evento'});

            if(!eventRemoved) return res.status(404).send({message: 'No se puede eliminar este evento'});

            return res.status(200).send({event: eventRemoved});
        });
     }

     
     
}

module.exports = controller;