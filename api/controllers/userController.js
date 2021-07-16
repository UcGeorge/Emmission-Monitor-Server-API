'use strict';

var User = require('../models/userModel');

exports.login = function(req, res) {
    console.log("[GET] /user/login");
    User.login(req.body.username, req.body.password, function (err, result){
        if (err){ 
            res.status(401).send(err);
        }else{
            res.json(result);
        }
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

exports.update = function(req, res) {
    console.log("[PUT] /user/update");
    User.authenticate(req.body.token, req.body.username, function (err, result){
        if (err){
            console.log(`   |__ Error: ${err}`);
            res.send(err)
        }
        else if(result){
            User.update(req.body.username, req.body.password, req.body.name, function (err, result){
                if (err) {
                    res.status(400).send(err);
                }else{
                    res.status(200).json(result);
                }
            });
        }else{
            console.log(`   |__ Unauthorized!!`);
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    });
};