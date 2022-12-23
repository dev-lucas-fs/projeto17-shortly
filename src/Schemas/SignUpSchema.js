const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password')
})