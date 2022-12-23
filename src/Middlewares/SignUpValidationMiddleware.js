const signUpSchemas = require('../Schemas/SignUpSchema')

module.exports = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    const { error } = signUpSchemas.validate({
        name, email, password, confirmPassword
    })
    
    if (error)
        return res.sendStatus(422)

    return next()
}