const Comments = require('../../models/Comments');
const validateCreateComment = require('../../validation/createCommentValidator');

var ticketController = {
    postComment: (req, res) => {
        try {
            const {
                error,
                isValid
            } = validateCreateComment(req.body);
            if (!isValid) {
                return res.status(404).json(error)
            }

            const newComment = new Comments({
                id: 'comment_' + new Date().getTime(),
                ticket_id: req.body.ticket_id,
                comment: req.body.comment,
                date: new Date(),
                created_by: req.body.created_by,
                closed_by: '',
            });
            newComment
                .save()
                .then(ticket => res.json(ticket))
                .catch(err => console.log(err));
        }
        catch (err) {
            console.log(err)
        }
    },
    getComment: (req, res) => {
        try {
            const { ticket_id } = req.query;
            Comments
                .find({ticket_id})
                .then(comments => {
                    res.send(comments)
                }).catch(err => {
                    console.log("error when Get comments", err)
                })

        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = ticketController;