var commonCtrl = require("./commonCtrl.js").getInstance();
var userService = require("../user/userService").getInstance();
var self;
var userController = function() {
  self = this;  
};





userController.prototype.create = function(req,res) {
  userService.create(req,function(err,data) {
      return commonCtrl.jsonOutput(err,res,data);
      
  });
};


userController.prototype.update = function(req,res) {
  userService.update(req,function(err,data) {
    return commonCtrl.jsonOutput(err,res,data);
  });
};

userController.prototype.activate = function(req,res) {
  userService.activate(req,function(err,data) {
    return commonCtrl.jsonOutput(err,res,data);
  });
};


module.exports.getInstance = function () {
  return new userController();
};
