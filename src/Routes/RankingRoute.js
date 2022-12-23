const { Router } = require('express')
const { getRanking  } = require('../Controllers/RankingController')

const router = Router()

router.get('/ranking', getRanking)

module.exports = router