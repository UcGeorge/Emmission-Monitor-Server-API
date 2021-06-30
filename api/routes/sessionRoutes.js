'use strict';
var express = require('express'),
    router = express.Router();

var session = require('../controllers/sessionController');
router
    .get('/', session.get)
    // .post('/signup', user.signup)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;