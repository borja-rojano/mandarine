# mandarine



## Structure of the app
The entry point of the app is `server.js` in the root directory.
This contains the connection to the db and the initialisation of the server.
The routes of the app are abstracted in a file `index.js`

The express server is wrapped in the callback function of the connection to the connection to the db.

```javascript

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

```

The routes themselves are in the `index.js` file. There is an api endpoint that accepts 3 methods:

```javascript

app.route('/api/clicks')
        .get(clickHandler.getClicks)
        .post(clickHandler.addClick)
        .delete(clickHandler.resetClicks);

```
These 3 functions are in the `clickhandler.server.js` file.
This file contains a *function object*, a function that is used to create an object.
The function object accepts a `db` parameter.
Said parameter is generated in `server.js`, passed to `index.js` and used there in the object created executing the function object.

`var clickHandler = new ClickHandler(db);` This creates the object passing the `db` we received from `server.js`.

These 3 functions each send a specific response to the server and execute an operation to the `clicks` collection of the database.
