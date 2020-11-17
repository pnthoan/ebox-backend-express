var passport = require('passport');
var mongoose = require('mongoose');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.login = function(req, res) {
    console.log("LOGIN!!!!!!!!!!!!")
    if(!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;

        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        if(user){
            console.log(user);
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token,
                "username": user.username,
                "name": user.name,
                "role": user.role
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);

};