var self;
var jwt = require('jsonwebtoken');
var userDao = require("../user/userDao.js").getInstance();
var miscHelper = require("../mischelper.js").getInstance();
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




module.exports.getInstance = function () {
    return new authService();
};