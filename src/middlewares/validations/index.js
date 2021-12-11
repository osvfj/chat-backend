const {
  userSchemaValidator,
  userSchemaValidatorUpdate,
} = require('./user-schema.validator');
const { verifyId } = require('./verify.validator');

module.exports = {
  userSchemaValidator,
  userSchemaValidatorUpdate,
  verifyId,
};
