"use strict"; 
var mysql = require("mysql");
var fs = require("fs");

exports.initDatabase = function () {
    console.log("# initDatabase");
    console.log("|__ declare con object");
    var con;
    console.log("|__# readFile");
    fs.readFile("./util/config.json", function(err, data) {
        if (err) throw err;
        console.log("   |__ parse config.json");
        var config = JSON.parse(data);
        console.log("   |__ initialize con object");
        con = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password
        });
    });
    console.log("|__# con.connect");
    con.connect(function (err) { 
        if (err) throw err;
        console.log("   |__ Connected!");
    });
    console.log("|__# con.query");
    con.query("CREATE DATABASE uchetestdb", function (err, result){ 
        if (err) throw err;
        console.log("   |__ Result: " + result);
    });
}
