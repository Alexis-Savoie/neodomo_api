// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { GamificationModel } from "../../../models/gamificationModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let API_URL: string = process.env.API_URL!
let JWT_TOKEN_SECRET_ADMIN: string = process.env.JWT_TOKEN_SECRET_ADMIN!

let testCorrectPassword = "bonjour123"





describe('searchGamificationRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchGamificationRoute_1@email.com"
        let gamificationForTest = {
            emailWinner: "searchGamificationRoute_user1@email.com",
            levelGet: 10,
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword,
            tokenAdmin: jwt.sign(emailForTest, JWT_TOKEN_SECRET_ADMIN, { algorithm: "HS256" })
        })
        let user = new GamificationModel(gamificationForTest)

        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            user.save().then(() => {
                request(API_URL)
                    .post('/admin/searchGaming')
                    .send('emailWinner=' + "searchGamificationRoute")
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + admin.tokenAdmin)
                    .expect(200)
                    .end(function (err: any, res: any) {
                        if (err) throw err;
                        else {
                            if (!res.body.gaming_events) {
                                throw ("err Gamification search")
                            }
                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                GamificationModel.findOneAndDelete({ emailUser: gamificationForTest.emailWinner }, null, function (err, results) {
                                    return done()
                                })
                            })
                        }
                    })
            })
        })
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

