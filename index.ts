// Import npm modules
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Import routes
import { routes } from './routes/indexRoute'

// Import models
import { PostModel } from './models/postModel'
/*
let post = new PostModel({
    emailPublisher: "test@email.com",
    textContent: "Ceci est est un test de post incroyable",
    listImage: [{ URL: "www.test.com/image.png"}],
    listLike: [{ id: "hogzjovfzegvivzniovz"}],
    listComment: [{ id: "hogzjovznjoivzniovz"}],
    listReport: [{ id: "jotiobnvznvnzeinicae"}]
})

post.save()
*/
const app = express() // Instance Express


// Import env variables
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log (".env : " + process.env.ENV)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Accept cords 
app.use(cors());

// Use all the routes on the express instance
app.use(routes)


// Run serve
app.listen(process.env.PORT || 8020, () => console.log("listening on " + process.env.API_URL))
