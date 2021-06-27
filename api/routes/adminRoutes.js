'use strict';
var express = require('express'),
    router = express.Router();

var admin = require('../controllers/adminControllers');
router
    .get('/login/:username/:password', admin.login)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;