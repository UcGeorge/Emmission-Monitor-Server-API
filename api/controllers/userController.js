'use strict';

var User = require('../models/userModel');

exports.login = function(req, res) {
    console.log("[GET] /user/login");
    User.login(req.body.username, req.body.password, function (err, result){
        if (err) res.send(err);
        res.json(result);
    });
};

exports.signup = function(req, res) {
    console.log("[POST] /user/signup");
    User.signup(req.body.username, req.body.password, req.body.name, function (err, result){
        if (err) {
            res.status(400).send(err);
        }else{
            res.status(200).json(result);
        }
    });
};