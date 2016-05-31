var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var userCtrl = require("../src/controller/userController.js").getInstance();
var authCtrl = require("../src/controller/authController").getInstance();
var roomCtrl = require("../src/controller/roomController").getInstance();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

function validateToken(req, res,next) {

    try {
        var authorization = req.get("Authorization");
        var payload = jwt.verify(authorization, process.env.jwtSecret);
        GLOBAL.AUTHUSER = payload.userId;
        console.log(payload);
        next();
    } catch(e) {
        res.status(401);
        res.send(e);
    }
    
}


router.get('/about', function(req, res) {
  res.send('The earth is still a good place to live!');
});

router.post('/users',userCtrl.create);
router.post('/login',authCtrl.login);
router.put('/users/:id',validateToken, userCtrl.update);
//router.delete('/users/:id', userCtrl.update);


router.post('/forgot-password',authCtrl.forgotPassword);
router.post('/reset-password',authCtrl.resetPassword);

router.post('/rooms',validateToken,roomCtrl.create);
//router.post('/reset-password',authCtrl.resetPassword);




module.exports = router;