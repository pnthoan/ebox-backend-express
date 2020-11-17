var mongoose = require('mongoose');
var Giay = mongoose.model('GiayModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET /api/giay */
module.exports.giayReadAll = function (req, res) {
    Giay.find()
       .exec(function(err, giay) {
            if (!giay) {
                sendJSONresponse(res, 404, {
                    "message": "giayId not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(giay);
            sendJSONresponse(res, 200, giay);
        });
    return;
};

/* POST /api/giay */
module.exports.giayCreate = function (req, res) {
    console.log(req.body);
    Giay.create({
            ma_sp: req.body.ma_sp,
            ten_sp: req.body.ten_sp,
            so_lop: req.body.so_lop,
            gia_sp: req.body.gia_sp,
            mo_ta: req.body.mo_ta
        }, function(err, giay) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(giay);
            sendJSONresponse(res, 201, giay);
        }
    });
};

/* GET /api/giay/:giayid */
module.exports.giayReadOne = function(req, res) {
    console.log('Finding location details', req.params);
    if (req.params && req.params.giayid) {
        Giay.findById(req.params.giayid)
           .exec(function(err, giay) {
                if (!giay) {
                    sendJSONresponse(res, 404, {
                        "message": "giayId not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(giay);
                sendJSONresponse(res, 200, giay);
            });
    } else {
        console.log('No giayId specified');
        sendJSONresponse(res, 404, {
            "message": "No giayId in request"
        });
    }
};

/* PUT /api/giay/:giayid */
module.exports.giayUpdateOne = function(req, res) {
    if (!req.params.giayid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid is required"
        });
        return;
    }
    Giay.findById(req.params.giayid)
        .exec(
            function(err, giay) {
                if (!giay) {
                    sendJSONresponse(res, 404, {
                        "message": "giayid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }

                if (req.body.ma_sp) {
                    giay.ma_sp = req.body.ma_sp;
                }

                if (req.body.ten_sp) {
                    giay.ten_sp = req.body.ten_sp;
                }
                if (req.body.so_lop) {
                    giay.so_lop = req.body.so_lop;
                }

                if (req.body.gia_sp) {
                    giay.gia_sp = req.body.gia_sp;
                }

                if (req.body.mo_ta) {
                    giay.mo_ta = req.body.mo_ta;
                }

                giay.save(function(err, giay) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, giay);
                    }
                });
            }
    );
};

/* DELETE /api/giay/:giayid */
module.exports.giayDeleteOne = function(req, res) {
    var giayid = req.params.giayid;
    console.log(giayid)
    if (giayid) {
        Giay.findByIdAndRemove(giayid)
           .exec(
                function(err, giayid) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("giay id " + giayid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
        );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No giayid"
        });
    }
};
