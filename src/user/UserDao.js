var self;
var userDao = function() {
  self = this;  
};



userDao.prototype.create = function(req,res) {
    res.json({one:1});
};

userDao.prototype.getList = function(req,res) {
    
    
    res.json({getList:1});
};
userDao.prototype.create = function(req,res) {
    
    
    
};




module.exports.getInstance = function () {
    return new userDao();
};