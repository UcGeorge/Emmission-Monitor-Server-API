var mysql = require("mysql");
var fs = require("fs");

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function maketoken(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

exports.login = function(username, password, callback){
    console.log("   |__# User login");
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
            if (err) throw err;
            console.log("         |__ Connected!");
            console.log("         |__ Query [SELECT * FROM `user` WHERE `username` = ...]");
            con.query("SELECT * FROM `user` WHERE `username` = '" + username + "' AND `password` = '" + password + "'", function (err, result, fields) {
                if (err) {
                    callback(err, null);
                    return;
                }else{
                    if (result.length > 0){
                        // console.log(result[0]);
                        let res = {
                            ID: result[0].ID,
                            username: result[0].username,
                            password: result[0].password,
                            name: result[0].name,
                            dateadded: result[0].dateadded,
                            token: result[0].token
                        };
                        callback(null, res);
                    }else{
                        // console.log("Admin not found");
                        let res = {
                            message: "Invalid username and password!"
                        };
                        callback(null, res);
                    }
                }
            });
            console.log("         |__ con.end");
            con.end();
        }catch(e){
            callback(e, null);
        }
    });
}

exports.signup = function(username, password, name, callback){
    console.log("   |__# User signup");
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
            if (err) throw err;
            console.log("         |__ Connected!");
            console.log("         |__ Query [INSERT INTO `emissionmonitor`.`user`]");
            let token = maketoken(100);
            var sql = `INSERT INTO \`emissionmonitor\`.\`user\` (username, password, name, token) VALUES ('${username}', '${password}', '${name}', '${token}')`;
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(`            |__ Error: ${err.sqlMessage}`);
                    callback(err, null);
                    return;
                }else{
                    let res = {
                        token: token
                    };
                    console.log(`           |__ Token: ${token}`);
                    callback(null, res);
                }
            });
            console.log("         |__ con.end");
            con.end();
        }catch(e){
            callback(e, null);
        }
    });
}

exports.authenticate = function(token, username, callback){
    console.log("   |__# Authenticate: " + token);
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
            console.log('         |__ Query [SELECT `username` FROM `emissionmonitor`.`user` WHERE `token` = $token]');
            var sql = `SELECT \`username\` FROM \`emissionmonitor\`.\`user\` WHERE \`token\` = '${token}'`;
            con.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(`            |__ Error: ${err.sqlMessage}`);
                    callback(err, null);
                    return;
                }else{
                    let res = false;
                    if(result.length > 0 && result[0].username == username ){
                        res = true;
                        console.log(`           |__ Authenticated!`);
                    }else{
                        console.log(`           |__ Un-authenticated!`);
                    }
                    callback(null, res);
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