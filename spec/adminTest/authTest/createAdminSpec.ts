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


describe('createAdminRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "createAdminRoute_1@email.com"
        let emailForCreation = "createAdminRoute_creation1@email.com"
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
                            .post('/admin/createAdmin')
                            .send('email=' + emailForCreation + '&password=' + testCorrectPassword)
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(201)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForCreation }, null, function (err, results) {
                                            return done()
                                        })
                                    })
                                }
                            })
                    }
                })

        })

    })



})





describe('createAdminRoute error cases', () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Invalid email', (done) => {
        let emailForTest = "createAdminRoute_2@email.com"
        let emailForCreation = "createAdminRoute_creation2email.com"
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
                            .post('/admin/createAdmin')
                            .send('email=' + emailForCreation + '&password=' + testCorrectPassword)
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(403)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForCreation }, null, function (err, results) {
                                            return done()
                                        })
                                    })
                                }
                            })
                    }
                })

        })
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Email already used', (done) => {
        let emailForTest = "createAdminRoute_3@email.com"
        let emailForCreation = "createAdminRoute_3@email.com"
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
                            .post('/admin/createAdmin')
                            .send('email=' + emailForCreation + '&password=' + testCorrectPassword)
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(409)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForCreation }, null, function (err, results) {
                                            return done()
                                        })
                                    })
                                }
                            })
                    }
                })
        })
    })
})