var mongoose = require('mongoose');
var DonHang = mongoose.model('DonHangModel');
var Item = mongoose.model('ItemModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST /api/dhang */
module.exports.dhangCreate = function (req, res) {
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
            if (!req.body.list_ids) {
                sendJSONresponse(res, 404, {
                    "message": "Does not have IDs"
                });
                return
            }

            Item.updateMany({_id: {$in: req.body.list_ids}}, {$set: {id_refer: dhang._id}})
           .exec(function(err, item) {
                if (!item) {
                    sendJSONresponse(res, 404, {
                        "message": "itemId not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 200, item);
            });
        }
    });
};