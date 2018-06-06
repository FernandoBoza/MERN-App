const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  // First Level Validator

  if (!Validator.isLength(data.text, { min: 10, max: 30 })) {
    errors.text = "Post must be between 10 and 30 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
