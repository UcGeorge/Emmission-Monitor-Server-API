'use strict';

var User = require('../models/userModel');
let authtokens = [];

exports.login = function(req, res) {
    console.log("[GET] /user/login");
    User.login(req.body.username, req.body.password, function (err, result, token){
        if (err) res.send(err);
        if (token) authtokens.push(token);
        res.json(result);
    });
};

exports.signup = function(req, res) {
    console.log("[POST] /user/signup");
    User.signup(req.body.username, req.body.password, req.body.name, function (err, result, token){
        if (err) {
            res.status(400).send(err);
        }else{
            if (token) authtokens.push(token);
            res.status(200).json(result);
        }
    });
};