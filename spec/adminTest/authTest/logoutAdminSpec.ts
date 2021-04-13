// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"
let testTemporaryPassword = "bonsoir123"
let testIncorrectPassword = "bonjour1234"

describe('logoutAdminRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "logoutAdminRoute_1@email.com"
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            request(API_URL)
                .post('/admin/login')
                .send('email=' + emailForTest + '&password=' + testCorrectPassword)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err: any, res: any) {
                    if (err) throw err;
                    else {
                        let token = res.body.token
                        request(API_URL)
                            .delete('/admin/logout')
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(200)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                        return done()
                                    })
                                }
                            })
                    }
                })
        })
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('logoutAdminRoute error cases', () => {

    it('Invalid token', (done) => {

        request(API_URL)
            .delete('/admin/logout')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer mauvaistoken')
            .expect(401, done)
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})