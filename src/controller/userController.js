var self;
var userController = function() {
  self = this;  
};

userController.prototype.create = function(req,res) {
  res.json({one:1});
};

userController.prototype.getList = function(req,res) {
  res.json({getList:1});
};

userController.prototype.create = function(req,res) {
  res.json({one:1});
};

module.exports.getInstance = function () {
  return new userController();
};
