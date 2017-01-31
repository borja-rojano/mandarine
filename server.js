'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://localhost:27017/mandarine', function (err, db) {

    //Error handling
    if (!err){
        console.log('Connected to Database');
    }

    //Middleware
    app.use('/public', express.static(process.cwd()+'/public'));
    app.use('/controllers', express.static(process.cwd()+'/app/controllers'));

    //Calling the routes
    routes(app,db);

    app.listen(3000, function () {
        console.log('Listening on port 3000...');
    });
});


