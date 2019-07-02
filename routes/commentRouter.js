var express             = require('express');
var router              = express.Router();
var commentController   = require('../api/controller/commentController');
var auth                = require('../middleware/index');


/* GET Tickets listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/post_comment', auth, commentController.postComment)
router.get('/get_comments', auth, commentController.getComment)


module.exports = router;