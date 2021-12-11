const { check } = require('express-validator');

const verifyId = [check('id', 'The ID is not valid').isMongoId()];

module.exports = { verifyId };
