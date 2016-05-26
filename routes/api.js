var express = require('express');
var router = express.Router();
var userCtrl = require("../src/controller/userController.js").getInstance();
console.log(JSON.stringify(userCtrl));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
    console.log("AAAAAAAAAAHHHH FCUKK");
  res.send('Lets share, Sharing is caring');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('Somebody like you');
});

router.post('/users',userCtrl.create);
router.get('/users',userCtrl.getList);

module.exports = router;