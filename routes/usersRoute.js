var express = require('express');
var router = express.Router();
var userController = require('../api/controller/userController')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/get',userController.getAllUsers);
router.post('/register',userController.createUser)
router.post('/login',userController.login)


module.exports = router;
