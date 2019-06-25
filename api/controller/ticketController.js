const Tickets = require('../../models/Tickets');
const validateCreateTicket = require('../../validation/createTicketValidator');

var ticketController = {
    createTicket: (req, res) => {
        try {
            const {
                error,
                isValid
            } = validateCreateTicket(req.body);
            if (!isValid) {
                return res.status(404).json(error)
            }
            
            const newTicket = new Tickets({
                ticket_id: new Date().getTime(),
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                created_by: req.body.created_by,
                created_date: new Date(),
                status: 1,
                closed_by: 'admin@request_pro.com',
            });
            newTicket
                .save()
                .then(ticket => res.json(ticket))
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

module.exports = ticketController;