const Validator = require("validator");
const isEmpty   = require("is-empty");

module.exports = function validateCreateComment(data) {
    console.log("DATA", data)
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.ticket_id = !isEmpty(data.ticket_id) ? data.ticket_id : "";
    data.comment = !isEmpty(data.comment) ? data.comment : "";
    data.created_by = !isEmpty(data.created_by) ? data.created_by : "";

    // Name checks
    if (Validator.isEmpty(data.ticket_id)) {
        errors.ticket_id = "Ticket ID is required";
    }

    // comment checks
    if (Validator.isEmpty(data.comment)) {
        errors.comment = "Comment is required";
    }

    // Created By checks
    if (Validator.isEmpty(data.created_by)) {
        errors.created_by = "Created By is required";
    } else if (!Validator.isEmail(data.created_by)) {
        errors.created_by = "Provide valid Email as Created By";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};