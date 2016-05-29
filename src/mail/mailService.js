var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var http = require('http');
var path = require('path');
var logger = require('log4js').getLogger();
var fs = require("fs");
var _ = require("underscore");

var nodemailer = require('nodemailer');
var self;
var mailService = function () {
    self = this;
};


mailService.prototype.sendMail = function (dataObject, callback) {
    var options = {};
    options.from = config.emailFrom;
    if (dataObject.to) {
        options.to = dataObject.to;
    }
    if (dataObject.subject) {
        options.subject = dataObject.subject;
    }
    if (dataObject.html) {
        options.html = dataObject.html;
    }
    var transporter = nodemailer.createTransport();
    console.log("transporter created");
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
            return callback(error);
        }
        console.log('Message sent: ' + info.response);
        return callback(null, info);
    });
};



/**
 * Get html
 * 
 * @param {type} templateName
 * @param {type} data
 * @returns {unresolved}
 */
mailService.prototype.getHtml = function (templateName, data) {
    var encoding, templateContent, templatePath;
    templatePath = path.join(__dirname, "./templates/" + templateName + ".html");
    logger.debug(templatePath);
    templateContent = fs.readFileSync(templatePath, encoding = "utf8");
    var test = _.template(templateContent, {
        interpolate: /\{\{(.+?)\}\}/g
    });
    return test(data);
};



/**
 * Send reset password
 * 
 * @param {type} data
 * @returns {undefined}
 */
mailService.prototype.sendResetPassword = function (data, callback) {
    console.log(" send reset password");
    var subject = "Reset password";
    console.log(config.resetpasswordUrl);
    var html = self.getHtml('reset-password',
            {
                name: data.first_name + " " + data.last_name,
                subject: subject,
                from: config.emailFrom,
                resetpasswordUrl: config.resetpasswordUrl + "/" + data.token
            });

    self.sendMail({
        to: data.to,
        subject: subject,
        html: html
    }, function (err, result) {
        if (err) {
            return callback({code: 422, msg: err});
        } else {
            return callback(null, "Mail sent");
        }
    });
}

module.exports.getInstance = function () {
    return new mailService();
};