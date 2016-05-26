var self;
var userService = function() {
  self = this;  
};

userService.prototype.create = function(req,res) {
    res.json({one:1});
};

userService.prototype.getList = function(req,res) {
    res.json({getList:1});
};
userService.prototype.create = function(req,res) {
};

module.exports.getInstance = function () {
    return new userService();
};