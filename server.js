"use strict";
var http = require('http');
var url = require('url');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

var database = require('./Util/database');
database.initDatabase();