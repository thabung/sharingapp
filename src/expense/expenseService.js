var env = process.env.NODE_ENV || 'development';
var _ = require("underscore");
var roomDao = require("../room/roomDao.js").getInstance();
var roomHasUserDao = require("../room/roomHasUserDao.js").getInstance();
var expenseStatusDao = require("../expense/expenseStatusDao.js").getInstance();
var expenseDao = require("../expense/expenseDao.js").getInstance();
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
    roomHasUserDao.isMember(data.room_id,GLOBAL.AUTHUSER, function(err,result) {
        if (err) {
           return callback(err);
        }
        self.getStatusCode(req,function(err,res1) {
            if (err) {
                return callback(err);
            } 
           
           
            data.uid = res1.dataValues.status;
            data.user_id = GLOBAL.AUTHUSER;
            
            console.log(data);
            expenseDao.create(data,function(err,res2) {
                if (err) {
                    return callback(err);
                }
                return callback(null,res2);
            });
        });
    });
};

/**
 * generate and get status code
 * 
 * @param {type} req
 * @param {type} callback
 * @returns {undefined}
 */
expenseService.prototype.getStatusCode = function (req, callback) {
    var data = req.body;
    roomHasUserDao.isMember(data.room_id,GLOBAL.AUTHUSER,function(err,result) {
        if (err) {
            return callback(err);
        }
        var roomId =  data.room_id;
        expenseStatusDao.getMaxStatusByRoomId(roomId,function(err,res1) {
            if (err) {
                return callback(err);
            } else {
                var createFunc = function(callback1) {
                    var uniqueId = require("md5")(new Date().getTime() + " " + roomId);
                    expenseStatusDao.create({
                        uid:uniqueId,
                        room_id:roomId,
                        status:0
                    },callback1);
                }
                if (res1.length) {
                    if (res1.status == 0) {
                       return callback(null,res1) ;
                    } else {
                        return createFunc(callback);
                    }
                } else {
                    return createFunc(callback);
                }
            }
        });
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



// change admin roles

module.exports.getInstance = function () {
  return new expenseService();
};

