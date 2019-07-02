const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CommentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    ticket_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true
    }
});
module.exports = Comments = mongoose.model("comments", CommentSchema);
