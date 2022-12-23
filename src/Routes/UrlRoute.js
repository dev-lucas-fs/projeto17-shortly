const { Router } = require('express')
const { getById, redirectByShortUrl, deleteById, shorten } = require('../Controllers/UrlController')
const tokenAuthorizationMiddleware = require('../Middlewares/TokenAuthorizationMiddleware')
const idParamsValidationMiddleware = require('../Middlewares/IdParamsValidationMiddleware')

const router = Router()

router.get('/urls/:id', idParamsValidationMiddleware, getById)
router.get('/urls/open/:shortUrl', redirectByShortUrl)
router.post('/urls/shorten', tokenAuthorizationMiddleware, shorten)
router.delete('/urls/:id', idParamsValidationMiddleware, tokenAuthorizationMiddleware, deleteById)

module.exports = router