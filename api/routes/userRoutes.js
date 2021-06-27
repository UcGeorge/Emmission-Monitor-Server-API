'use strict';
var express = require('express'),
    router = express.Router();

var user = require('../controllers/userController');
router
    .get('/login/:username/:password', user.login)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;