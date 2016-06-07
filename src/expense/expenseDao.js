var env = process.env.NODE_ENV || 'development';
var _ = require("underscore");
var roomHasUserDao = require("../room/roomHasUserDao.js").getInstance();
var models = require('../../models');

var expense = require("../").getInstance();
var self;
var expenseDao = function () {
    self = this;
};

expenseDao.prototype.create = function(data,callback) {
    
};