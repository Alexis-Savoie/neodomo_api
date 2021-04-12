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
let testIncorrectPassword = "bonjour1234"

describe('authAdminRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "authAdminRoute_1@email.com"
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
                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                            return done()
                        })
                    }
                })
        })
    })

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('authAdminRoute error cases', () => {

    it('Invalid email', (done) => {
        let emailForTest = "authAdminRouteemail.com"

        request(API_URL)
            .post('/admin/login')
            .send('email=' + emailForTest + '&password=' + testCorrectPassword)
            .set('Accept', 'application/json')
            .expect(403, done)

    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Incorrect creditentials (email)', (done) => {
        let emailForTest = "authAdminRoute_2@email.com"
        let emailForTestFalse = "authAdminRoute_false@email.com"
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
                .send('email=' + emailForTestFalse + '&password=' + testCorrectPassword)
                .set('Accept', 'application/json')
                .expect(400)
                .end(function (err: any, res: any) {
                    if (err) throw err;
                    else {
                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                            return done()
                        })
                    }
                })
        })
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Too many failed attempts', (done) => {
        let emailForTest = "authAdminRoute_3@email.com"
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
                .send('email=' + emailForTest + '&password=' + testIncorrectPassword)
                .set('Accept', 'application/json')
                .expect(400)
                .end(function (err: any, res: any) {
                    if (err) throw err;
                    else {
                        request(API_URL)
                        .post('/admin/login')
                        .send('email=' + emailForTest + '&password=' + testIncorrectPassword)
                        .set('Accept', 'application/json')
                        .expect(400)
                        .end(function (err: any, res: any) {
                            if (err) throw err;
                            else {
                                request(API_URL)
                                .post('/admin/login')
                                .send('email=' + emailForTest + '&password=' + testIncorrectPassword)
                                .set('Accept', 'application/json')
                                .expect({ "error": true, "message": "Trop de tentatives réessayer plus tard." })
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