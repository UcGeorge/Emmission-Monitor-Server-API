var mysql = require("mysql");
var fs = require("fs");

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

exports.get = function(callback){
    console.log("   |__# Get Fuel types");
    console.log("      |__# mysql.createConnection");
    let con = mysql.createConnection({
        host: process.env.dbhost,
        user: process.env.dbuser,
        password: process.env.dbpass,
        database: "emissionmonitor"
    });

    console.log("      |__# con.connect");
    con.connect(function(err) {
        try{
            if (err) {
                console.log(`         |__ Error: ${err}`);
                return;
            }
            console.log("         |__ Connected!");
            console.log('         |__ Query [SELECT * FROM `emissionmonitor`.`fueltype`]');
            var sql = 'SELECT * FROM `emissionmonitor`.`fueltype`';
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(`            |__ Error: ${err.sqlMessage}`);
                    callback(err, null);
                    return;
                }else{
                    callback(null, result);
                }
            });
            console.log("         |__ con.end");
            con.end();
        }catch(e){
            // throw e;
            callback(e, null);
        }
    });
}