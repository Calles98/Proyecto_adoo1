'use strict'

var express = require('express');
var EventController = require('../controllers/event');
var DiplomaController = require('../controllers/diploma');


var router = express.Router();  

var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file = {}, cb) {
    const { originalname } = file;
   
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + fileExtension);
    });
  },
});
var mul_upload = multer({dest: './uploads',storage});

router.get('/home', EventController.home); 
router.get('/test', EventController.test);
router.post('/save-event', EventController.saveEvent);
router.get('/event/:id?', EventController.getEvent);
router.get('/events', EventController.getEvents);
router.put('/event/:id', EventController.updateEvent);
router.delete('/event/:id', EventController.deleteEvent);
// ---------------------- Diploma routes --------------------------
router.post('/save-diploma', DiplomaController.saveDiploma);
router.get('/diploma/:id?', DiplomaController.getDiploma);
router.put('/diploma/:id', DiplomaController.updateDiploma);
router.post('/upload-image/:id',  mul_upload.single('image') ,DiplomaController.uploadImage);
router.get('/get-image/:image', DiplomaController.getImage);



module.exports = router;