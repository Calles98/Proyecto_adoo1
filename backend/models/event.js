'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var EventSchema = Schema({
    name: String, 
    professor: String, 
    typeEvent: String, 
    startDate: String, 
    endDate: String, 
    duration: Number, 
    participants: Number,
    aproved: Boolean
    //collection: 'events'
});




module.exports = mongoose.model('Event', EventSchema);
