var env = process.env.NODE_ENV || 'development';
var _ = require("underscore");
var models = require('../../models');
var self;
var expenseStatusDao = function () {
    self = this;
};

expenseStatusDao.prototype.create = function (data, callback) {
    models.expenseStatus.create(data).then(function (res) {
        if (res) {
            return callback(null, res);
        }
        else {
            return callback({code: 422, msg: "Creatoin failed"});
        }
    });
};

expenseStatusDao.prototype.getMaxStatusByRoomId = function (roomId, callback) {
    $query = "select * from expenseStatus \n\
 where id=(select max(id) from expenseStatus where room_id=:roomId)";
    models.sequelize.query($query,
            {replacements: {roomId: roomId}, type: models.sequelize.QueryTypes.SELECT}
    ).then(function (rhu) {
        
        if (rhu) {
            callback(null, rhu);
        } else {
            callback(null,null);
//            callback({code: 422, msg: "No members in the room"});
        }
    });
};

module.exports.getInstance = function () {
    return new expenseStatusDao();
};
