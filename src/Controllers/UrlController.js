const { nanoid } = require("nanoid")
const connection = require('../Database')

module.exports = {
    shorten: async (req, res) => {
        const { url } = req.body
        const shortUrl = nanoid(8)

        console.log(res.locals.user)

        try {
            await connection.query(`
                INSERT INTO URLS (URL, "shortUrl", "userId") VALUES ( $1, $2, $3)
            `, [url, shortUrl, res.locals.user.id])
            
            return res.send({
                shortUrl
            })
        } catch (error) {
            return res.sendStatus(500)
        }
    },
    getById: async (req, res) => {
        const { id } = req.params

        try {
            const url = await connection.query(`
                SELECT ID, "shortUrl", URL FROM URLS WHERE ID = $1
            `, [id])

            if (url.rows.length === 0)
                return res.sendStatus(404)
            
            return res.status(200).send(url.rows[0])
        } catch(error) {
            return res.sendStatus(500)
        }
    },
    redirectByShortUrl: async (req, res) => {
        const { shortUrl } = req.params
        try {
            const url = await connection.query(`
                SELECT ID, URL, VISITS FROM URLS WHERE "shortUrl" = $1
            `, [shortUrl])

            if (url.rows.length === 0)
                return res.sendStatus(404)
            
            await connection.query(`
                UPDATE URLS SET VISITS = VISITS + 1 WHERE ID = $1
            `, [url.rows[0].id])

            return res.redirect(url.rows[0].url)
        } catch(error) {
            return res.sendStatus(500)
        }
    },
    deleteById: async (req, res) => {
        const { id } = req.params

        const user = res.locals.user

        try {
             const url = await connection.query(`
                SELECT ID, "userId" FROM URLS WHERE ID = $1
            `, [id])

            if (url.rows.length === 0)
                return res.sendStatus(404)
            
            
            if (url.rows[0].userId !== user.id)
                return res.sendStatus(401)
            
            await connection.query(`
                DELETE FROM URLS WHERE ID = $1
            `, [id])

            return res.sendStatus(204)
        } catch(error) {
            return res.sendStatus(500)
        }

    }
}