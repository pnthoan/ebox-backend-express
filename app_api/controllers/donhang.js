var mongoose = require('mongoose');
var DonHang = mongoose.model('DonHangModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST /api/dhang */
module.exports.dhangCreate = function (req, res) {
    console.log(req.body);
    DonHang.create({
            khach_hang: req.body.khach_hang,
            lien_he: req.body.lien_he,
            dia_chi: req.body.dia_chi,
            email: req.body.email,
            user: req.body.user
        }, function(err, dhang) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 201, dhang);
        }
    });
};