var mongoose = require('mongoose');
var Item = mongoose.model('ItemModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET /api/item */
module.exports.itemQuery = function (req, res) {
    console.log(req.body)
    Item.find()
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
    return;
};

/* POST /api/item */
module.exports.itemCreate = function (req, res) {
    console.log(req.body);
    Item.create({
            loaihop: req.body.loaihop,
            loaigiay: req.body.loaigiay,
            dai: parseInt(req.body.dai),
            rong: parseInt(req.body.rong),
            cao: parseInt(req.body.cao),
            soluong: parseInt(req.body.soluong),
            soluongmau: parseInt(req.body.soluongmau),
            gia: parseFloat(req.body.gia),
            ghichu: req.body.ghichu
        }, function(err, item) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, item);
        }
    });
};

/* GET /api/item/:itemid */
module.exports.itemReadOne = function(req, res) {
    if (req.params && req.params.itemid) {
        Item.findById(req.params.itemid)
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
    } else {
        sendJSONresponse(res, 404, {
            "message": "No itemId in request"
        });
    }
};

/* DELETE /api/item/:itemid */
module.exports.itemDeleteOne = function(req, res) {
    var itemid = req.params.itemid;
    console.log(itemid)
    if (itemid) {
        Item.findByIdAndRemove(itemid)
        .exec(
            function(err, itemid) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            }
        );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No itemid"
        });
    }
};
