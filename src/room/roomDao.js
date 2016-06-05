var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var models = require('../../models');

var self;
var roomDao = function () {
    self = this;
};


roomDao.prototype.create = function (data, callback) {
    data.created_by = GLOBAL.AUTHUSER;

    models.room.create(data).then(function (res) {
        if (res) {
            return callback(null, res);
        } else {
            callback({code: 422, msg: "Failed room creation"});
        }
    });
};

roomDao.prototype.get = function (req, callback) {

};


/** 
 * Get room and users
 * 
 * @param {type} roomId
 * @param {type} callback
 * @returns {undefined}
 */
roomDao.prototype.getRoomAndUsers = function (roomId, callback) {
    models.room.find({where: {id: roomId}})
            .then(function (res) {
                if (res) {
                    $query = "select u.id as id, first_name, last_name from\n\
                                user u INNER JOIN\n\
                                roomHasUsers rhu on u.id=rhu.user_id\n\
                                where rhu.room_id=:roomId";
                    models.sequelize.query($query,
                            {replacements: {roomId: roomId}, type: models.sequelize.QueryTypes.SELECT}
                    ).then(function (rhu) {
                        if (rhu) {
                            res.dataValues.users = rhu;

                            callback(null, res);
                        } else {
                            callback({code: 422, msg: "No members in the room"});
                        }
                    });
                } else {
                    return callback({code: 200, msg: "No room found"});
                }
            });
};



module.exports.getInstance = function () {
    return new roomDao();
};


