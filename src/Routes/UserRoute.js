const { Router } = require('express')
const { signIn, signUp, me  } = require('../Controllers/UserController')
const UserEmailNotExistMiddleware = require("../Middlewares/UserEmailNotExistMiddleware")
const SignInValidationMiddleware = require("../Middlewares/SignInValidationMiddleware")
const SignUpValidationMiddleware = require("../Middlewares/SignUpValidationMiddleware")
const tokenAuthorizationMiddleware = require('../Middlewares/TokenAuthorizationMiddleware')

const router = Router()

router.post('/signin', SignInValidationMiddleware, signIn)
router.post('/signup', SignUpValidationMiddleware, UserEmailNotExistMiddleware, signUp)
router.get('/users/me', tokenAuthorizationMiddleware, me)


module.exports = router