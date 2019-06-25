const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateTicket(data) {
    console.log("DATA", data)
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.created_by = !isEmpty(data.created_by) ? data.created_by : "";

    // Name checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    // Description checks
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    // Type checks
    if (data.type <= 0) {
        errors.type = "Type is required";
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