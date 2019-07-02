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
                assigned_to: 'admin@rp.com',
            });
            newTicket
                .save()
                .then(ticket => res.json(ticket))
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    fetchTickets: (req, res) => {
        try {
            const { role_id, email } = req.decoded;

            if(role_id === 1) {
                Tickets.find().sort({created_date: -1}).then(tickets => {
                    res.send(tickets)
                }).catch(err => {
                    console.log("error when Get tickets", err)
                })
            } else {
                Tickets.find({created_by: email}).then(tickets => {
                    res.send(tickets)
                }).catch(err => {
                    console.log("error when Get tickets", err)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },

    ticketDetails: (req, res) => {
        try {
            const { ticket_id } = req.query;
            Tickets.findOne({ticket_id}).then(tickets => {
                res.send(tickets)
            }).catch(err => {
                console.log("error when Get tickets", err)
            })

        } catch (error) {
            console.log(error);
        }
    },

    updateTicket: (req, res) => {
        try {
            const { ticket_id, status, assigned_to } = req.body;
            Tickets.findOneAndUpdate({ticket_id}, {$set: {
                status,
                assigned_to
            }}).then(tickets => {
                res.send(tickets)
            }).catch(err => {
                console.log("error when Get tickets", err)
            })

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ticketController;