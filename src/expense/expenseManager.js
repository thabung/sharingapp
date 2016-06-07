var env = process.env.NODE_ENV || 'development';
var _ = require("underscore");
var roomDao = require("../room/roomDao.js").getInstance();
var roomHasUserDao = require("../room/roomHasUserDao.js").getInstance();
var self;
var expenseService = function () {
    self = this;
};

/**
 * Request callback
 * 
 * @param {type} req
 * @param {type} callback
 * @returns {undefined}
 */
expenseService.prototype.create = function(req,callback) {
    var data = req.body;
    roomHasUserDao.isMember(data.room_id,data.user_id, function(err,result) {
        if (err) {
           return callback(err);
        }
        
    });
};



expenseService.prototype.getStatusCode = function (req, callback) {
    var data = req.body;
    roomHasUserDao.isMember(data.room_id,miscHelper.AUTHUSER,function(err,result) {
        if (err) {
            return callback(err);
        }
        
    });



};


/**
 * 
 * @param {type} req
 * @param {type} callback
 * @returns {undefined}
 */
expenseService.prototype.read = function(req,callback) {
    var roomId = req.params.id;
    console.log(roomId);
    roomHasUserDao.isMember(GLOBAL.AUTHUSER,roomId,function(err,res) {
        if (err) {
            return callback(err);
        } else {
            roomDao.getRoomAndUsers(roomId,function(err,res1) {
                if (err) {
                    return callback(err);
                }
                return callback(null,res1);
            });
        }
    })
};


expenseService.prototype.update = function (req, callback) {
    var data = req.body;
    var updateData = {
        'name': data.name
    }
    roomDao.update(updateData, function (err, response) {
        if (err) {
            return   callback(err);
        } else {
            return callback(null, response);
        }
    });
};

expenseService.prototype.delete = function (req, callback) {
    var roomId = req.params.id;
    roomHasUserDao.isAdmin(data.room_id, GLOBAL.AUTHUSER, function (err, yesNo) {
        if (err) {
            return callback(err);
        } else {
            
            roomHasUserDao.deleteByRoomId(roomId, function (err, result) {
                if (err) {
                    callback(err);
                }
                roomDao.delete();
                return callback(null, res);
            });
        }
    });

};

expenseService.prototype.addUserToRoom = function(req,callback){
    var data = req.body;
    roomHasUserDao.isAdmin(data.room_id,GLOBAL.AUTHUSER,function(err,yesNo) {
        if (err) {
            return callback(err);
        } else {
            roomHasUserDao.create(data,function(err,result) {
                if (err) {
                    callback(err);
                }
                return callback(null,res);
            });
        }
    });
}

expenseService.prototype.delete = function (req, callback) {
    var data = req.body;
    roomHasUserDao.isAdmin(data.room_id, GLOBAL.AUTHUSER, function (err, yesNo) {
        if (err) {
            return callback(err);
        } else {
            roomDao.delete(data.room_id, function (err, res) {
                if (err) {
                    return callback(err);
                } else {
                    roomHasUserDao.deleteUserByRoomId(data.room_id, function (err, result) {
                        if (err) {
                           return callback(err);
                        }
                        return callback(null, result);
                    });
                }
            });
        }
    });
};


expenseService.prototype.removeUserFromRoom = function(req,callback) {
    // check if user is admin
    var data = req.body;
    roomHasUserDao.isAdmin(data.room_id,data.user_id,function(err,isAdmin) {
        if (err) {
           return callback(err);
        }
        roomHasUserDao.remove(data.room_id,data.user_id,function(err,result) {
            if (err) {
                return callback(err);
            }
            callback(null,result);
            
        });
    });
}

expenseService.prototype.changeRole = function(req,callback) {
    // check if user is admin
    var data = req.body;
    roomHasUserDao.isAdmin(data.room_id,data.user_id,function(err,isAdmin) {
        if (err) {
           return callback(err);
        } 
        roomHasUserDao.update({room_id:data.room_id,user_id:data.user_id,role:data.role},function(err,result) {
            if (err) {
                return callback(err);
            }
            callback(null,result);
            
        });
    });
}

/**
 * 
 * @param {type} req
 * @param {type} callback
 * @returns {undefined}
 */
expenseService.prototype.leaveRoom = function (req, callback) {
    var data = req.body;
    var input = {user_id: GLOBAL.AUTHUSER, room_id: data.room_id};
    roomHasUserDao.deleteByUserAndRoom(input, function (err, response) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, response);
        }
    });
};

// change admin roles

module.exports.getInstance = function () {
  return new expenseService();
};

