var mysql = require("mysql");
var fs = require("fs");

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

exports.get = function(username, callback){
    console.log("   |__# Get Sessions for " + username);
    console.log("      |__# mysql.createConnection");
    let con = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
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
            console.log('         |__ Query [SELECT * FROM `emissionmonitor`.`session` WHERE `username` = $username]');
            var sql = `SELECT * FROM \`emissionmonitor\`.\`session\` WHERE \`username\` = '${username}'`;
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

exports.put = function(username, sessionObject, callback){
    console.log("   |__# Put Sessions for " + username);
    console.log("      |__# mysql.createConnection");
    let con = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
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
            console.log('         |__ Query [INSERT INTO `emissionmonitor`.`session`]');
            var sql = `INSERT INTO \`emissionmonitor\`.\`session\` \
                (username, fuel_ID, distance, emission_quantity) \
                VALUES ('${sessionObject.username}', '${sessionObject.fuel_ID}', '${sessionObject.distance}', '${sessionObject.emission_quantity}')`;
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