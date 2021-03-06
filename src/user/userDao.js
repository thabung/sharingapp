var models = require('../../models');
var miscHelper = require("../mischelper.js").getInstance();
var md5 = require('md5');
var self;

var userDao = function () {
    self = this;
};

/**
 * Generate password
 * 
 * @param {type} password
 * @returns {unresolved}
 */
userDao.prototype.generatePassword = function (password)
{
    
    return md5(password + "asdfg1234sdfafsdfsa");
}

userDao.prototype.create = function (data, callback) {
    models.user.find({where: {
            email: data.email
        }}).then(function (circle) {
        if (circle) {
            callback({code: 409, msg: "Email exist"});
        } else {
            data.password = self.generatePassword(data.password);
            models.user.create(data).then(function (res) {
                callback(null, res);
            });
        }
    });
};

/**
 * user login
 * 
 * @param {type} email
 * @param {type} password
 * @param {type} callback
 * @returns {undefined}
 */
userDao.prototype.getUserForLogin = function (email, password, callback) {
    models.user.find({where: {
            email: email,
            password: self.generatePassword(password)
        }}).then(function (circle) {
        if (circle) {
            return callback(null, circle);
        } else {
            return callback({code: 401, msg: "Invalid credentials"});
        }
    });

};

userDao.prototype.getList = function (req, res) {


    res.json({getList: 3});
};

userDao.prototype.update = function (data, callback) {
    if (!miscHelper.isNull(data.password)) {
        data.password = self.generatePassword(data.password);
    }
    models.user.find({where:{id: data.id}}).then(function (res) {
        res.updateAttributes(data).then(function (result) {
            return  callback(null, result);
        });
    });

};


/**
 * Get active user by email
 * 
 * @param {type} email
 * @param {type} callback
 * @returns {undefined}
 */
userDao.prototype.getActiveUserByEmail = function (email, callback) {
    models.user.find({where:{email: email}}).then(function (res) {
        if (res) {
            if (res.isActive == 1) {
                return callback(null, res);
            } else {
                return callback({code: 422, msg: "User not activated"});
            }
        } else {
            return callback({code: 422, msg: "No user found with this email"});
        }
    });
};

userDao.prototype.getUserByResetToken = function (resetToken, callback) {
    console.log(resetToken);
    models.user.find({where:{token: resetToken}}).then(function (res) {
        if (res) {
            console.log("LOGIININNGNGGNGN");
            if (res.isActive == 1) {
                return callback(null, res);
            } else {
                return callback({code: 422, msg: "User not activated"});
            }
        } else {
            return callback({code: 422, msg: "No user found with this token"});
        }
    });
};

module.exports.getInstance = function () {
    return new userDao();
};