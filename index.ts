// Import npm modules
import express from 'express'
import bodyParser from 'body-parser'




//const bodyParser = require("body-parser")


// Import routes
import { routes } from './routes/indexRoute'

const app = express() // Instance Express
const port = 8020;

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log (".env : " + process.env.ENV)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Use all the routes on the express instance
app.use(routes)


// Run serve
app.listen(port, () => console.log(`listening on http://localhost:${port}`))
