'use strict';
var express = require('express'),
    router = express.Router();

var user = require('../controllers/userController');
router
    .get('/login', user.login)
    .post('/signup', user.signup)
    .put('/update', user.update)
    .get('*', (req, res)=>{
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    module.exports = router;