const connection = require('../Database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    signUp: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body
        
        if (password != confirmPassword)
            return res.sendStatus(422)

        try {
            const queryString = `
                INSERT INTO USERS (NAME, EMAIL, PASSWORD) VALUES ($1, $2, $3)
            `
            const encriptPassword = await bcrypt.hash(password, 10)
            await connection.query(queryString, [name, email, encriptPassword])

            return res.sendStatus(201)
        } catch(error) {
            return res.sendStatus(500)
        }

    },
    signIn: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await connection.query(
                `SELECT EMAIL, PASSWORD FROM USERS WHERE EMAIL = $1`,
                [email]
            )
                
            if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password)))
                return res.sendStatus(401)
            
            const token = jwt.sign({ email }, process.env.SECRET_JWT, { expiresIn: 999999 })

            return res.send({ token })
        } catch(error) {
            return res.sendStatus(500)
        }
    },
    me: async (req, res) => {
        const { id } = res.locals.user

        try {

            const user = await connection.query(`
                SELECT  USERS.id, USERS.name
                FROM USERS
                WHERE USERS.ID = $1
            `, [id])
            
            if (user.rows === 0)
                return res.sendStatus(404)

            const visitCount = await connection.query(`
                SELECT SUM(URLS.visits) as "visitCount"
                FROM USERS
                JOIN URLS ON URLS."userId" = $1
                WHERE USERS.ID = $1
                GROUP BY USERS.id;
            `, [id])

            const shortsUrl = await connection.query(`
                SELECT ID, "shortUrl", url, visits FROM URLS WHERE URLS."userId" = $1
            `, [id])

            return res.status(200).send({...user.rows[0], ...visitCount.rows[0], shortenedUrls: shortsUrl.rows })
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
}

//               (SELECT json_agg(*) FROM URLS WHERE "userId" = USER.ID) as "shortenedUrls"