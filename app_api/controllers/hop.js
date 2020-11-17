var mongoose = require('mongoose');
var Hop = mongoose.model('HopModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET /api/hop */
module.exports.hopReadAll = function (req, res) {
    Hop.find()
       .exec(function(err, hop) {
            if (!hop) {
                sendJSONresponse(res, 404, {
                    "message": "hopId not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(hop);
            sendJSONresponse(res, 200, hop);
        });
    return;
};

/* POST /api/hop */
module.exports.hopCreate = function (req, res) {
    console.log(req.body);
    Hop.create({
        loai_hop: req.body.loai_hop,
        cong_thuc: req.body.cong_thuc,
        loi_nhuan: req.body.loi_nhuan
        }, function(err, hop) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(hop);
            sendJSONresponse(res, 201, hop);
        }
    });
};

/* GET /api/hop/:hopid */
module.exports.hopReadOne = function(req, res) {
    console.log('Finding location details', req.params);
    if (req.params && req.params.hopid) {
        Hop.findById(req.params.hopid)
           .exec(function(err, hop) {
                if (!hop) {
                    sendJSONresponse(res, 404, {
                        "message": "hopId not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(hop);
                sendJSONresponse(res, 200, hop);
            });
    } else {
        console.log('No hopId specified');
        sendJSONresponse(res, 404, {
            "message": "No hopId in request"
        });
    }
};

/* PUT /api/hop/:hopid */
module.exports.hopUpdateOne = function(req, res) {
    if (!req.params.hopid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid is required"
        });
        return;
    }
    Hop.findById(req.params.hopid)
        .exec(
            function(err, hop) {
                if (!hop) {
                    sendJSONresponse(res, 404, {
                        "message": "hopid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }

                if (req.body.loai_hop) {
                    hop.loai_hop = req.body.loai_hop;
                }

                if (req.body.cong_thuc) {
                    hop.cong_thuc = req.body.cong_thuc;
                }

                if (req.body.loi_nhuan) {
                    hop.loi_nhuan = req.body.loi_nhuan;
                }

                hop.save(function(err, hop) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, hop);
                    }
                });
            }
    );
};

/* DELETE /api/hop/:hopid */
module.exports.hopDeleteOne = function(req, res) {
    var hopid = req.params.hopid;
    console.log(hopid)
    if (hopid) {
        Hop.findByIdAndRemove(hopid)
           .exec(
                function(err, hopid) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("hop id " + hopid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
        );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No hopid"
        });
    }
};
