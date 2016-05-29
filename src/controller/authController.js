var commonCtrl = require("./commonCtrl.js").getInstance();
var authService = require("../auth/authService.js").getInstance();
var self;
var authController = function() {
  self = this;  
};



authController.prototype.login = function(req,res){
    authService.login(req,function(err,data) {
        return commonCtrl.jsonOutput(err,res,data);
    });
    
}



authController.prototype.forgotPassword = function(req,res){
    authService.forgotPassword(req,function(err,data) {
        return commonCtrl.jsonOutput(err,res,data);
    });
    
}
module.exports.getInstance = function () {
  return new authController();
};
