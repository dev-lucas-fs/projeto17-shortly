const signInSchemas = require('../Schemas/SignInSchema')

module.exports = async (req, res, next) => {
    const { email, password } = req.body

    const { error } = signInSchemas.validate({
        email, password
    })

    if (error)
        return res.sendStatus(422)

    return next()
}