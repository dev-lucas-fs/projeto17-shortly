const connection = require('../Database')

module.exports = async (req, res, next) => {
    const { email } = req.body

    try {
        const emails = await connection.query(`
            SELECT ID FROM USERS WHERE EMAIL = $1
        `, [email])

        if (emails.rows.length !== 0)
            return res.sendStatus(409)
        console.log(email.rows)
        return next()
    } catch (error) {
        return res.sendStatus(500)
    }
}