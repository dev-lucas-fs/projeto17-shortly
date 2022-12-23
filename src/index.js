const express = require('express')
const dotenv = require('dotenv')
const UserRoute = require('./Routes/UserRoute')
const RankingRoute = require('./Routes/RankingRoute')
const UrlRoute = require('./Routes/UrlRoute')

const app = express()
app.use(express.json())
app.use(UserRoute)
app.use(RankingRoute)
app.use(UrlRoute)

dotenv.config()

app.listen(process.env.PORT)