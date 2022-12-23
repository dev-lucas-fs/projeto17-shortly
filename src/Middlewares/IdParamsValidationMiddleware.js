const Joi = require("joi")

module.exports = async (req, res, next) => {
    const { id } = req.params

    const { error } = Joi.number().integer().required().min(1).validate(id)

    if (error)
        return res.sendStatus(401)

    return next()
}