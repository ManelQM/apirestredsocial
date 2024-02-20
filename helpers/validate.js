const validator = require("validator");

const validate = (params) => {
  let name =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: 30 }) &&
    validator.isAlpha(params.name, "es-ES");

  let surname =
    !validator.isEmpty(params.surname) &&
    validator.isLength(params.surname, { min: 3, max: 30 }) &&
    validator.isAlpha(params.name, "es-ES");

  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: 30 });

  let email =
    !validator.isEmpty(params.email) &&
    validator.isEmail(params.email, { min: 3, max: 30 });
};

module.exports = validate;
