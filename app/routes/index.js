'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {

    var clickHandler = new ClickHandler(db);
    /*
    * A new instance of the function object ClickHandler. This passes the db info
    * to the handler so we can reference the methods created in that function con
    * this.method using db as an object.
    *
    * db is created in the server file, passed to index.js and here we use it as an argument in
    * a function object that we have defined in clickhandler.server.js
    * */


    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route('/api/clicks')
        .get(clickHandler.getClicks)
        .post(clickHandler.addClick)
        .delete(clickHandler.resetClicks);


};