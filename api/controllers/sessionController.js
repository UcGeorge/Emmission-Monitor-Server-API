'use strict';

var Session = require('../models/sessionModel');
var User = require('../models/userModel');
var Fuel = require('../models/fuelModel');

exports.get = function(req, res) {
    console.log("[GET] /sessions");
    User.authenticate(req.body.token, req.body.username, function (err, result){
        if (err){
            console.log(`   |__ Error: ${err}`);
            res.send(err)
        }
        else if(result){
            Session.get(req.body.username, function (err, result){
                Fuel.get(function (err, fuelresult){
                    res.status(200).json({sessions : result, fuel : fuelresult})
                })
            })
        }else{
            console.log(`   |__ Unauthorized!!`);
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    });
};

exports.put = function(req, res) {
    console.log("[PUT] /sessions");
    User.authenticate(req.body.token, req.body.username, function (err, result){
        if (err){
            console.log(`   |__ Error: ${err}`);
            res.send(err)
        }
        else if(result){
            let sessionObject = {
                username : req.body.username,
                fuel_ID : req.body.fuel,//parseInt(req.body.fuel, 10),
                distance : req.body.distance,
                emission_quantity : req.body.emission_quantity
            }
            // console.log(sessionObject)
            Session.put(req.body.username, sessionObject, function (err, result){
                res.status(200).json(result)
            })
        }else{
            console.log(`   |__ Unauthorized!!`);
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    });
};