var env = process.env.NODE_ENV || 'development';
var _ = require("underscore");
var roomHasUserDao = require("../room/roomHasUserDao.js").getInstance();
var models = require('../../models');

var self;
var expenseDao = function () {
    self = this;
};

expenseDao.prototype.create = function (data, callback) {
    models.expense.create(data).then(function (res) {
        if (res) {
            return callback(null, res);
        }
        else {
            return callback({code: 422, msg: "Creatoin failed"});
        }
    });
};



module.exports.getInstance = function () {
    return new expenseDao();
};