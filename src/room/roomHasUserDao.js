var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var models = require('../../models');

var self;
var roomHasUserDao = function () {
    self = this;
};


/**
 * 
 * @param {type} data
 * @param {type} callback
 * @returns {undefined}
 */
roomHasUserDao.prototype.create = function (data, callback) {
    models.roomHasUsers.find({where: {
            user_id: data.user_id
        }}).then(function (roomHasUser) {
        if (roomHasUser) {
            callback({code: 409, msg: "User already present"});
        } else {
            models.roomHasUsers.create(data).then(function (res) {
                if (res) {
                    return callback(null, res);
                } else {
                    return callback({code: 422, msg: "Failed adding users to room"});
                }
            });
        }
    });
    
    
    
    
};

roomHasUserDao.prototype.get = function (req, callback) {

};

roomHasUserDao.prototype.isMember = function (roomId, userId,callback) {
    models.roomHasUsers.find({where: {room_id: roomId, user_id: userId}}).then(function (res) {
        if (res) {
           return callback(null,res);
        } else {
            return callback({code:422,msg:"You are not a member"});
        }
    });
}
roomHasUserDao.prototype.isAdmin = function (roomId, userId, callback) {
    models.roomHasUsers.find({where: {room_id: roomId, user_id: userId}}).then(function (res) {
        
        if (res) {
            if (res.dataValues.role == "admin") {
                return callback(null, true);
            } else {
                return callback({code:401,msg:"You cannot perform this action"});
            }
        } else {
            return callback({code:401,msg:"You cannot perform this action"});
        }
    });
};

roomHasUserDao.prototype.deleteByRoomId = function(roomId,callback) {
    
    
    
};

module.exports.getInstance = function () {
    return new roomHasUserDao();
};
