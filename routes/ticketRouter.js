var express             = require('express');
var router              = express.Router();
var ticketController    = require('../api/controller/ticketController')


/* GET Tickets listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/create', ticketController.createTicket)


module.exports = router;