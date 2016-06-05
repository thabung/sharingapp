var commonCtrl = require("./commonCtrl.js").getInstance();
var roomService = require("../room/roomService.js").getInstance();
var self;
var roomController = function() {
  self = this;  
};

/**
 * Create room
 * 
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
roomController.prototype.create = function(req,res) {
  roomService.create(req,function(err,data) {
      return commonCtrl.jsonOutput(err,res,data);
  });
};



roomController.prototype.read = function(req,res) {
  roomService.read(req,function(err,data) {
      return commonCtrl.jsonOutput(err,res,data);
  });
};

//roomController()

module.exports.getInstance = function () {
  return new roomController();
};
