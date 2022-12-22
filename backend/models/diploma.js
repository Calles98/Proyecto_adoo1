'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var DiplimaSchema = Schema({
    name: String, 
    lastName: String, 
    eventName: String, 
    image: String,
    //collection: 'diplomas'

});

module.exports = mongoose.model('Diploma', DiplimaSchema);