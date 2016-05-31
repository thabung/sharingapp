var self;
var jwt = require('jsonwebtoken');
var userDao = require("./userDao.js").getInstance();
var miscHelper = require("../mischelper.js").getInstance();
var authService = require("../auth/authService.js").getInstance();
var validator = require('validator');
var userService = function () {
    self = this;
};


userService.prototype.getList = function (req, res) {
    res.json({getList: 1});
};

userService.prototype.validateUser = function (data) {
    var errorList = {};
    if (miscHelper.isNull(data.first_name)) {
        errorList['first_name'] = "First name is required";
    }

    if (miscHelper.isNull(data.last_name)) {
        errorList['last_name'] = "Last name is required";
    }
    if (miscHelper.isNull(data.password)) {
        errorList['password'] = "Password is required";
    } else {
        if (miscHelper.isNull(data.reenter_password)) {
            errorList['retenter_password'] = "Renenter password is required";
        } else {
            console.log("here");
            if (!validator.equals(data.reenter_password,data.password)) {
                errorList['password'] = "Reenter password mismatch";
            }
        }
    }


    return errorList;
}

userService.prototype.create = function (request, callback) {
//    console.log( process.env.jwtSecret)
//    callback({code:3333});
    var data = request.body;
    var errorList = self.validateUser(data);
    if (Object.keys(errorList).length > 0) {
        return callback({code:422,msg:errorList});
    }

    userDao.create(data, function (err, data) {
        if (err) {
            return callback(err);
        } 
        //@TODO: send mail
        console.log("Send mail");
        return callback(null, data);
    });
};


userService.prototype.update = function(req, callback){
    var userId = req.params.id;
    var data = req.body;
    if (GLOBAL.AUTHUSER == userId) {
        data.id = userId;
        userDao.update(data,function(err,result) {
            if (err) {
                return callback(err);
            } else {
                return callback(null,result);
            }
        });
    } else {
        callback({code:401,msg:"Unauthorized"})
    }

    
    
}

userService.prototype.activate = function(req,callback) {
    
    userDao.getUserByResetToken(data.token,function(err,result) {
        if (result) {
            data.id = result.id;
            data.token = "";
            data.isActive = 1;
            console.log(data);
            return userDao.update(data,callback);
        } else {
            return callback(err);
        }
        
    });
    
}

module.exports.getInstance = function () {
    return new userService();
};