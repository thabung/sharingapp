var self;
var commonController = function () {
    self = this;
};
commonController.prototype.jsonOutput = function (err, res, data) {
    if (err) {
        if (err.code) {
            res.status(err.code);

        }
        res.json(err);
    } else {
        res.json(data);
    }
};
module.exports.getInstance = function () {
    return new commonController();
};
