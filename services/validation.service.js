const Joi = require('joi');

// handle create user validation schema
const createUserSchema = Joi.object({
    nickname: Joi.string().min(2).required(),
    username: Joi.string().min(2).required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().min(2).required(),
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
