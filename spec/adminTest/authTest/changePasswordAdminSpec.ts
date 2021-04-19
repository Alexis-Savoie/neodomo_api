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
let testNewPassword = "bonjour321"
let testTemporaryPassword = "bonsoir123"
let testIncorrectPassword = "bonjour1234"
let testIncorrectPasswordTooShort = "bonj"

describe('changePasswordAdmin success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "changePasswordAdmin_1@email.com"
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
                            .put('/admin/changePassword')
                            .send('password=' + testCorrectPassword + '&newPassword=' + testNewPassword)
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(201)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    request(API_URL)
                                        .post('/admin/login')
                                        .send('email=' + emailForTest + '&password=' + testNewPassword)
                                        .set('Accept', 'application/json')
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
                    }
                })
        })
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
describe('changePasswordAdmin error cases', () => {

    it('Invalid password (Too short)', (done) => {
        let emailForTest = "changePasswordAdmin_2@email.com"
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
                            .put('/admin/changePassword')
                            .send('password=' + testCorrectPassword + '&newPassword=' + testIncorrectPasswordTooShort)
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(403, done)
                    }
                })
        })
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})
*/