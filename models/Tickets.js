const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TicketsSchema = new Schema({
    ticket_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        required: true
    },
    closed_by: {
        type: String
    }
});
module.exports = Tickets = mongoose.model("tickets", TicketsSchema);

// Types
// 1 = Service
// 2 = Bug

// Types
// 1 = Not Started
// 2 = In Progress
// 3 = Closed