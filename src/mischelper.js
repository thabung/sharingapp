var self;

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


module.exports.getInstance = function () {
    return new miscHelper();
};