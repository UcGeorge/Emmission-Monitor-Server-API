'use strict';
var express = require('express'),
    router = express.Router();

var session = require('../controllers/sessionController');
router
    .get('/', session.get)
    .put('/', session.put)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;