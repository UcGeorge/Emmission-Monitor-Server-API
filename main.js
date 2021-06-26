"use strict";
var http = require('http');

http.createServer(function (_request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Hello World');
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

var database = require('./Util/database');
database.initDatabase();