'use strict';

var User = require('../models/userModel');
let authtokens = [];

exports.login = function(req, res) {
    console.log("[GET] /user/login/:username/:password");
    User.login(req.params.username, req.params.password, function (err, result, token){
        if (err) res.send(err);
        if (token) authtokens.push(token);
        res.json(result);
    });
};