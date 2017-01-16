'use strict';

function clickHandler (db) {

    var clicks = db.collection('clicks');

    this.getClicks = function (req, res) {

        clicks.findOne({}, function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    };
}

module.exports = clickHandler;