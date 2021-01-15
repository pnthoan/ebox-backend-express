var mongoose = require('mongoose');
// var DonHang = mongoose.model('DonHangModel');
// var Item = mongoose.model('ItemModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.orderCreate = function (req, res) {
    sendJSONresponse(res, 404, "orderCreate");
}