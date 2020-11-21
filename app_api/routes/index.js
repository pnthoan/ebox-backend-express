var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function authenticateToken(req, res, next)
{
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1])

    // const token = null;
    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, process.env.JWT_SECRET,
        function(err, user) {
            if (err) return res.sendStatus(403)
            req.user = user
            next(); // pass the execution off to whatever request the client intended
    });
}

var ctrlHop = require('../controllers/hop');
var ctrlGiay = require('../controllers/giay');
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');
var ctrlCal = require('../controllers/calculate');
var ctrUpload = require('../controllers/uploadfile');

// authentication
router.post('/login', ctrlAuth.login);

// user
router.post('/user', ctrlUsers.usersCreate);
router.get('/user', authenticateToken, ctrlUsers.userReadAll);
router.get('/user/:userid', authenticateToken, ctrlUsers.userReadOne);
router.put('/user/:userid', authenticateToken, ctrlUsers.userUpdateOne);
router.delete('/user/:userid', authenticateToken, ctrlUsers.userDeleteOne);

// Loai Giay
router.post('/giay', authenticateToken, ctrlGiay.giayCreate);
router.get('/giay', authenticateToken, ctrlGiay.giayReadAll);
router.get('/giay/:giayid', authenticateToken, ctrlGiay.giayReadOne);
router.put('/giay/:giayid', authenticateToken, ctrlGiay.giayUpdateOne);
router.delete('/giay/:giayid', authenticateToken, ctrlGiay.giayDeleteOne);

// Loai Hop
router.post('/hop', authenticateToken, ctrlHop.hopCreate);
router.get('/hop', authenticateToken, ctrlHop.hopReadAll);
router.get('/hop/:hopid', authenticateToken, ctrlHop.hopReadOne);
router.put('/hop/:hopid', authenticateToken, ctrlHop.hopUpdateOne);
router.delete('/hop/:hopid', authenticateToken, ctrlHop.hopDeleteOne);

// Calculator
router.get('/calculate', authenticateToken, ctrlCal.Calculate);

// Upload excel file
router.post('/upload', authenticateToken, ctrUpload.uploadFile);
router.post('/export', authenticateToken, ctrUpload.exportFile);

module.exports = router;
