var express             = require('express');
var router              = express.Router();
var commentController    = require('../api/controller/commentController')


/* GET Tickets listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/post_comment', commentController.postComment)
router.get('/get_comments', commentController.getComment)


module.exports = router;