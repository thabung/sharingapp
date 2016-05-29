var self;
md5 =require('md5');

var miscHelper = function () {
    self = this;
};

miscHelper.prototype.isNull = function (value) {
    if (typeof value == "undefined") {

        return true;
    } else {
        if (value.trim() == "") {
            return true;
        } else {
            return false;
        }
    }

};


miscHelper.prototype.checkErrorExist = function(erroObject) {
    if (Object.keys(erroObject).length > 0) {
        return true;
    } else {
        return false;
    }
    
}


miscHelper.prototype.generateRandomToken = function(email) {
    return md5(new Date().getTime() + email);
}




module.exports.getInstance = function () {
    return new miscHelper();
};