const jwt = require('jsonwebtoken')
const connection = require('../Database')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.sendStatus(401)
    
    const authorizationSplited = authorization.split(" ")

    if (authorizationSplited.length !== 2 || authorizationSplited[0] !== 'Bearer')
        return res.sendStatus(401)

    return jwt.verify(authorizationSplited[1], process.env.SECRET_JWT, async (error, token) => {
        if (error) 
            return res.sendStatus(401)

        try {
            const users = await connection.query(`
                SELECT * FROM USERS WHERE EMAIL = $1
            `, [token.email])

            if (users.rows.length === 0)
                return res.sendStatus(404)
            
            res.locals.user = users.rows[0]
        } catch (error) {
            return res.sendStatus(401)
        }

        return next()
    })

}