'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://localhost:27017/mandarine', function (err, db) {
    if (!err){
        console.log('Connected to Database');
    };

    app.use('/public', express.static(process.cwd()+'/public'));
    app.use('/controllers', express.static(process.cwd()+'/app/controllers'));

    routes(app);

    app.listen(3000, function () {
        console.log('Listening on port 3000...');
    });
});

