var mongoose = require('mongoose');
var User = mongoose.model('UserModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET /api/user */
module.exports.userReadAll = function (req, res) {
    User.find()
       .exec(function(err, user) {
            if (!user) {
                sendJSONresponse(res, 404, {
                    "message": "userId not found"
                });
                return;
            } else if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            let ele
            for (ele in user) {
                if (user[ele].username === 'pnthoan') {
                    user.splice(ele, 1)
                }
            }
            sendJSONresponse(res, 200, user);
        });
    return;
};

/* POST /api/user */
module.exports.usersCreate = function (req, res) {
    if(!req.body.name || !req.body.email ||
        !req.body.password || !req.body.username ||
        !req.body.role || !req.body.phone || !req.body.address) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var user = new User();
    user.username = req.body.username;
    user.name = req.body.name;
    user.role = req.body.role;
    user.email = req.body.email;

    user.phone = req.body.phone;
    user.address = req.body.address;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, user);
        }
    });
};

/* GET /api/user/:userid */
module.exports.userReadOne = function(req, res) {
    if (req.params && req.params.userid) {
        User.findById(req.params.userid)
       .exec(function(err, user) {
            if (!user) {
                sendJSONresponse(res, 404, {
                    "message": "userId not found"
                });
                return;
            } else if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, user);
        });
    } else {
        sendJSONresponse(res, 404, {
            "message": "No userId in request"
        });
    }
};

/* PUT /api/user/:userid */
module.exports.userUpdateOne = function(req, res) {
    if (!req.params.userid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid is required"
        });
        return;
    }
    User.findById(req.params.userid)
        .exec(
            function(err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }

                if (req.body.username) {
                    user.username = req.body.username;
                }

                if (req.body.name) {
                    user.name = req.body.name;
                }

                if (req.body.role) {
                    user.role = req.body.role;
                }

                if (req.body.email) {
                    user.email = req.body.email;
                }
                if (req.body.phone) {
                    user.phone = req.body.phone;
                }

                if (req.body.address) {
                    user.address = req.body.address;
                }

                if (req.body.password) {
                    user.setPassword(req.body.password);
                }

                user.save(function(err, user) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, user);
                    }
                });
            }
    );
};

/* DELETE /api/user/:userid */
module.exports.userDeleteOne = function(req, res) {
    var userid = req.params.userid;
    if (userid) {
        User.findByIdAndRemove(userid)
       .exec(
            function(err, userid) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            }
        );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No userid"
        });
    }
};
