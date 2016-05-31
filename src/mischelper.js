var self;
var randomstring = require("randomstring");
 

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
    return randomstring.generate() ;

}




module.exports.getInstance = function () {
    return new miscHelper();
};