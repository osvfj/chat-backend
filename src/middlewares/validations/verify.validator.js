const { check } = require('express-validator');

const verifyId = [check('id', 'The ID is not valid').isMongoId().notEmpty()];

module.exports = { verifyId };
