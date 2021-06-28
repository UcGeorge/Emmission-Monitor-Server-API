'use strict';
var express = require('express'),
    router = express.Router();

var user = require('../controllers/userController');
router
    .get('/login', user.login)
    .post('/signup', user.signup)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;