var commonCtrl = require("./commonCtrl.js").getInstance();
var expenseService = require("../expense/expenseService.js").getInstance();
var self;
var expenseController = function () {
};

expenseController.prototype.create = function (req, res) {
    expenseService.create(req, function (err, data) {
        return commonCtrl.jsonOutput(err, res, data);
    });
}



module.exports.getInstance = function () {
  return new expenseController();
};
