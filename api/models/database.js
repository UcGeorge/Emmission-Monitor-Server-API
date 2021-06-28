"use strict"; 
var mysql = require("mysql");
var fs = require("fs");

console.log("# parse config.json");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

exports.initDatabase = function () {
    console.log("# initDatabase");
    console.log("|__ initialize con object");
    var con = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password
    });
    console.log("|__# con.connect");
    con.connect(function (err) { 
        if (err) throw err;
        console.log("   |__ Connected!");

        console.log("   |__ Query [CREATE DATABASE IF NOT EXISTS `emissionmonitor`]");
        var sql = "CREATE DATABASE IF NOT EXISTS `emissionmonitor`";
        con.query(sql, function (err, _result){ if (err) throw err; });

        console.log("   |__ Query [CREATE TABLE IF NOT EXISTS `emissionmonitor`.`fueltype`]");
        sql = "CREATE TABLE IF NOT EXISTS `emissionmonitor`.`fueltype` ( \
            `ID` INT NOT NULL AUTO_INCREMENT , \
            `name` VARCHAR(50) NOT NULL , \
            `factor` DECIMAL(3, 1) NOT NULL , \
            `dateadded` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \
            PRIMARY KEY (`ID`))";
        con.query(sql, function (err, _result) { if (err) throw err; });

        console.log("   |__ Query [CREATE TABLE IF NOT EXISTS `emissionmonitor`.`user`]");
        sql = "CREATE TABLE IF NOT EXISTS `emissionmonitor`.`user` ( \
            `username` VARCHAR(50) NOT NULL , \
            `password` VARCHAR(50) NOT NULL , \
            `name` VARCHAR(50) NOT NULL , \
            `dateadded` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \
            PRIMARY KEY (`username`))";
        con.query(sql, function (err, _result) { if (err) throw err; });

        console.log("   |__ Query [CREATE TABLE IF NOT EXISTS `emissionmonitor`.`admin`]");
        sql = "CREATE TABLE IF NOT EXISTS `emissionmonitor`.`admin` ( \
            `username` VARCHAR(50) NOT NULL , \
            `password` VARCHAR(50) NOT NULL , \
            `name` VARCHAR(50) NOT NULL , \
            `dateadded` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \
            PRIMARY KEY (`username`))";
        con.query(sql, function (err, _result) { if (err) throw err; });

        console.log("   |__ Query [CREATE TABLE IF NOT EXISTS `emissionmonitor`.`session`]");
        sql = "CREATE TABLE IF NOT EXISTS `emissionmonitor`.`session` \
        ( \
            `ID` INT NOT NULL AUTO_INCREMENT , \
            `user_ID` INT NOT NULL , \
            `fuel_ID` INT NOT NULL , \
            `distance` DECIMAL(50, 3) NOT NULL , \
            `emission_quantity` DECIMAL(50, 3) NOT NULL , \
            `dateadded` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \
            PRIMARY KEY (`ID`), \
            FOREIGN KEY (`user_ID`) REFERENCES `emissionmonitor`.`user`(`username`) ON DELETE CASCADE ON UPDATE CASCADE, \
            FOREIGN KEY (`fuel_ID`) REFERENCES `emissionmonitor`.`fueltype`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE \
        )";
        con.query(sql, function (err, _result) { if (err) throw err; });

        console.log("   |__ con.end");
        con.end();
    });
}