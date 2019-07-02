var express             = require('express');
var router              = express.Router();
var ticketController    = require('../api/controller/ticketController');
var auth                = require('../middleware/index');

/* GET Tickets listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/get', auth, ticketController.fetchTickets);
router.get('/ticket_details', auth, ticketController.ticketDetails);
router.put('/ticket_details', auth, ticketController.updateTicket);
router.post('/create', auth, ticketController.createTicket);

module.exports = router;