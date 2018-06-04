const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // First Level Validator
  if (Validator.isEmpty(data.school)) {
    errors.school = "School Field is Required";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree Field is Required";
  }
  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field Of Study Field is Required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From Date Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
