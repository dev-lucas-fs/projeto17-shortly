const connection = require('../Database')

module.exports = {
    getRanking: async (req, res) => {
        try {
            const ranking = await connection.query(`
                SELECT USERS.id, USERS.name, COUNT(URLS.ID) AS "linksCount", SUM(URLS.visits) as "visitCount"
                FROM USERS
                JOIN URLS ON URLS."userId" = USERS.ID
                GROUP BY USERS.ID
                ORDER BY "visitCount" DESC
                LIMIT 10;
            `)
            let rankings = ranking.rows
            if (rankings.length < 10) {
                let no_ranking = await connection.query(`
                    SELECT USERS.id, USERS.name
                    FROM USERS
                `)
                no_ranking = no_ranking.rows.filter(item => !ranking.rows.map(r => r.id).includes(item.id)).map(item => (
                    {...item, ...({ linksCount: 0, visitCount: 0 })}
                ))
                rankings = [...rankings, ...no_ranking.slice(0, 10 - rankings.length)]
            }
            return res.send(rankings)
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
}