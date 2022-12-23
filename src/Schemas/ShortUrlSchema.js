const Joi = require('joi');

module.exports = Joi.object({
    shortUrl: Joi.string().required().length(8)
})