const fields = require('./validate-fields');
const authorization = require('./authorization');
const csrf = require('./csrf');
const roleAuth = require('./role-auth');

module.exports = {
  fields,
  authorization,
  csrf,
  roleAuth,
};
