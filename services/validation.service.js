const Joi = require('joi');

// handle create user validation schema
const createUserSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().min(2).required(),
    password: Joi.string().min(4).required(),
    age: Joi.number().integer().min(0).max(150).required(),
});


/**
 * @param {Object} data
 * @returns {Object || NULL} error
 */
const isCreateValid = data => {
    const { error } = createUserSchema.validate(data);
    return error;
}


module.exports = {
    isCreateValid,
}
