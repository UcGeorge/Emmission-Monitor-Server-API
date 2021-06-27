var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  Admin = require('./api/models/adminModel'), //created model loading here
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var adminRoutes = require('./api/routes/adminRoutes');
var userRoutes = require('./api/routes/userRoutes');

// Import my test routes into the path '/test'
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

var database = require('./api/models/database');
database.initDatabase();