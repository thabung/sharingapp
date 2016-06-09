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



expenseDao.prototype.getExpenseSummary = function(data,callback) {
    
    var query = "select user.first_name as first_name, user.last_name as last_name,\n\
user.id as userId, sum(expense) as expense ,user_id from expense\n\
     INNER JOIN user on user.id=expense.id \n\
     where room_id=:roomId and and expense.uid=:uid group by user.id";
    
    
    models.sequelize.query(query,
            {replacements: {roomId: data.room_id,uid:data.uid}, type: models.sequelize.QueryTypes.SELECT}
    ).then(function (rhu) {
        if (rhu) {
            callback(null, rhu);
        } else {
            callback(null,null);
        }
    });
    
    
}


module.exports.getInstance = function () {
    return new expenseDao();
};