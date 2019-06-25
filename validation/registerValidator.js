const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    console.log("DATA", data)
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";
    data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.role_id = !isEmpty(data.role_id) ? data.role_id : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm password field is required";
    }
    // if (Validator.isEmpty(data.user_id)) {
    //     errors.user_id = "user_id field is required";
    // }
    // if (Validator.isEmpty(data.role_id)) {
    //     errors.role_id = "role_id field is required";
    // }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};