'use strict';

var Session = require('../models/sessionModel');
var User = require('../models/userModel');

exports.get = function(req, res) {
    console.log("[GET] /sessions/:token");
    User.authenticate(req.body.token, req.body.username, function (err, result){
        if (err){
            console.log(`   |__ Error: ${err}`);
            res.send(err)
        }
        else if(result){
            // DO STUFF
            res.status(200).json({
                message:"Authorized"
            })
        }else{
            console.log(`   |__ Unauthorized!!`);
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    });
};