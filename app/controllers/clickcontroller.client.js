'use strict';
(function () {

    console.log("Ready");
    //Referencing the html buttons
    var addButton = document.querySelector('.btn-add');
    var deleteButton = document.querySelector('.btn-delete');

    //The number of clicks are displayed here
    var clickNumber = document.querySelector('#click-nbr');

    //The URL of the API
    var apiUrl = 'http://localhost:3000/api/clicks';



//Function that will check that the DOM has loaded, and will execute another function (fn) once that condition has been met.

    function ready (fn) {

      //We do nothing if fn is not a function. This prevents elements like arrays and strings from being provided as arguments.
      if (typeof fn !== 'function'){return;}

      //Returning fn() does execute the function we get as argument. We run this when the document is completely loaded.
      if(document.readyState === 'complete'){
          return fn();
      }

      // If the document is not loaded when we run this ready function, we add an event listener to document.
      document.addEventListener('DOMContentloaded', fn, false);
    }


//Retrieving data from the API

    function ajaxRequest(method, url, callback) {
        // The first argument is he HTTP method that we would like the request to use (i.e. GET / POST / DELETE)

        // Next we are creating a new instance of the XMLHttpRequest object using constructor notation.
        // Doing this will allow us to access the methods (i.e. functionality) associated with this object.
        // Think of this as essentially creating a "copy" of the XMLHttpRequest object for us to use.
        var xmlhttp = new XMLHttpRequest();


        // Next we are assigning a callback function to the property onreadystatechange.
        // Every time the readyState property of the XMLHttpRequest object changes, it will execute the function that we're defining.
        xmlhttp.onreadystatechange = function () {

            // A readyState of 4 means that the operation (i.e. data retrieval) has been completed.
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200){

                callback(xmlhttp.response);
                // This response property is the piece that will contain the data from the AJAX request.
            }
        };

        // When the function is first called, we want to initiate the request.
        // The last parameter is async: A boolean value which specifies if the request should be made asynchronously.
        // In this case, we do want the request to be asynchronous, so we specify a value of true
        xmlhttp.open(method, url, true);

        xmlhttp.send();
    }

// Updating the click count data
    function updateClickCount(data) {
        const clicksObject = JSON.parse(data);
        clickNumber.innerHTML = clicksObject.clicks;
    }


// Getting the data once the page loads
    ready(ajaxRequest('GET', apiUrl, updateClickCount));


// Adding functionality to click me
    addButton.addEventListener('click', function () {

        ajaxRequest('POST', apiUrl, function () {
            ajaxRequest('GET', apiUrl, updateClickCount);
        });

    }, false);

// Adding functionality to reset

    deleteButton.addEventListener('click',function () {
        ajaxRequest('DElETE', apiUrl, function () {
            ajaxRequest('GET', apiUrl, updateClickCount);
        })
    } ,false)


}());
