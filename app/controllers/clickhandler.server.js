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

    this.addClick = function (req, res) {
        clicks.findAndModify(
            {},                         //What do we want to find
            {},                         //How do we sort it
            {$inc: {'clicks': 1}},      // To what we find, increase it by one
            function (err, result) {
                if(err){throw err};
                res.json(result);
            }
        );
    };

    this.resetClicks = function (req, res) {
        clicks.update(
            {},                     //What do we want to find
            {'clicks': 0},          //Update changing for this
            function (err, result) {
                if(err){throw err};
                res.json(result);
            }
        );
    };

}

module.exports = clickHandler;