const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // First Level Validator

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email Field is Invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is Required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
