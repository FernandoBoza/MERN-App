const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // First Level Validator
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job Title Field is Required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company Field is Required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From Date Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};