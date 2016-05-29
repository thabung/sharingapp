var self;
var jwt = require('jsonwebtoken');
var userDao = require("../user/userDao.js").getInstance();
var miscHelper = require("../mischelper.js").getInstance();
var mailService = require("../mail/mailService.js").getInstance();
var validator = require('validator');
var authService = function () {
    self = this;
};






authService.prototype.validateUserForLogin = function(data){
    
    var returnData = {};
    if (miscHelper.isNull(data.email)) {
        returnData.email = "Email is required";
    }
    
    if (miscHelper.isNull(data.password)) {
        returnData.email = "Password is required";
    }
    return returnData;
}


/**
 * Login user
 * 
 * @param {type} request
 * @param {type} callback
 * @returns {undefined}
 */
authService.prototype.login = function (request, callback) {

    var inputData = request.body;
    console.log("inputData--------------------");
    console.log(inputData);
    console.log("inputData--------------------");

    var errorList = self.validateUserForLogin(inputData);
    if (miscHelper.checkErrorExist(errorList)) {
        callback({code: 422, msg: errorList});
    }

    userDao.getUserForLogin(inputData.email,inputData.password, function (err, data) {
        if (err) {
            return callback(err);
        }
        if (!data.isActive) {
            return callback({code:422,msg:"User not activated"});
        }
        var secretCode = process.env.jwtSecret;
        var payload = {
            userId: data.id
        };
        
        var token = jwt.sign(payload, secretCode,
            {
              expiresIn: '365d',
              algorithm: 'HS256'
            }
        );
        return callback(null, {
            token: token,
            user:{
                first_name:data.first_name,
                last_name:data.last_name,
                email:data.email
            }
        });
    });
}


/**
 * Forgot password
 * 
 * @param {type} req
 * @param {type} res
 * @returns {unresolved}
 */
authService.prototype.forgotPassword = function (req, callback) {
    var data = req.body;
    if (miscHelper.isNull(data.email)) {
        return callback({code: 422, msg: "Email missing"});
    }
    userDao.getActiveUserByEmail(data.email, function (err, result) {
        if (err) {
            return callback(err);
        } else {
            var data = {id: result.id, token: miscHelper.generateRandomToken()};
            userDao.update(data, function (err, updateResult) {
                if (err) {
                    return callback(err);
                }
                mailService.sendResetPassword(
                        {
                            to:updateResult.email,
                            token:updateResult.token
                        },callback
                    );
             });
            }
    });
}

authService.prototype.resetPassword = function(req,callback) {
    var data = req.body;
    console.log(data);
    userDao.getUserByResetToken(data.token,function(err,result) {
        if (result) {
            data.id = result.id;
            data.token = "";
            console.log("data------------------");
            console.log(data);
            if (!miscHelper.isNull(data.password)) {
                return userDao.update(data,callback);
            } else {
                callback({code:422,msg:"Password missing"});
            }
        } else {
            return callback(err);
        }
        
    });
}




module.exports.getInstance = function () {
    return new authService();
};