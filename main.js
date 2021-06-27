"use strict";
var http = require('http');
var url = require('url');

console.log('Server running at http://127.0.0.1:8080/');

var database = require('./Util/database');
database.initDatabase();

http.createServer(function (_request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  switch(_request.url){
    case '/login':
      break;
  }

  response.end('Hello World');
}).listen(8080);