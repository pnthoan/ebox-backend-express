var mongoose = require('mongoose');
var Giay = mongoose.model('GiayModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET /api/giay */
module.exports.Calculate = function (req, res) {
    console.log("Calculate function")
    sendJSONresponse(res, 200, giay);
    return;
};