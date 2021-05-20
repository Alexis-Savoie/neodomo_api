// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { ProductModel } from "../../../models/productModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
import { UserModel } from "../../../models/userModel";
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!
let JWT_TOKEN_SECRET_ADMIN: string = process.env.JWT_TOKEN_SECRET_ADMIN!

let testCorrectPassword = "bonjour123"





describe('editUserRoute success cases', () => {

    it('Correct case with string modifier', (done) => {
        let emailForTest = "editUserRoute1@email.com"
        let emailUserForTest = "editUserRouteUser1@email.com"
        let newFirstname = 'Bernard'

        // Create an user for the test
        let user = new UserModel({
            emailUser: emailUserForTest,
            passwordUser: testCorrectPassword,
            firstname: "Michel"
        })

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })


        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            user.save().then(() => {
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
                                .put('/admin/editUser')
                                .send('email=' + emailUserForTest + '&firstname=' + newFirstname)
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        UserModel.find({ firstname: newFirstname }, function (error, results) {
                                            if (results == null || results.length == 0)
                                                throw ("error edit user")
                                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                UserModel.findOneAndDelete({ emailUser: emailUserForTest }, null, function (err, results) {
                                                    return done()
                                                })
                                            })
                                        })
                                    }
                                })
                        }
                    })
            })
        })
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('editUserRoute error cases', () => {

    it('user (email) doesnt exist', (done) => {
        let emailForTest = "editUserRoute2@email.com"
        let emailUserForTest = "editUserRouteUser2@email.com"
        let newFirstname = 'Bernard'

        // Create an user for the test
        let user = new UserModel({
            emailUser: emailUserForTest,
            passwordUser: testCorrectPassword,
            firstname: "Michel"
        })

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })


        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            user.save().then(() => {
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
                                .put('/admin/editUser')
                                .send('email=' + 'fake.adress@email.com' + '&firstname=' + newFirstname)
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(422)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            UserModel.findOneAndDelete({ emailUser: emailUserForTest }, null, function (err, results) {
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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})