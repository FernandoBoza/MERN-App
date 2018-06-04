const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // First Level Validator

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle Needs to be Between 2 and 4 Characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle Field is Required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status Field is Required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills Field is Required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
