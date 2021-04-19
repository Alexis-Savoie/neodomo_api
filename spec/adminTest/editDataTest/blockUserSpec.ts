// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { UserModel } from "../../../models/userModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('blockUserRoute success cases', () => {

    it('Correct case (unblock --> block)', (done) => {
        let emailForTest = "blockUserRoute_1@email.com"
        let emailUserForTest = "blockUserRoute_user1@email.com"

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let user = new UserModel({
            emailUser: emailUserForTest,
            passwordUser: testCorrectPassword,
        })
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        user.passwordUser = bcrypt.hashSync(user.passwordUser, salt)
        admin.save().then(() => {
            user.save().then(() => {
                UserModel.find({ emailPublisher: emailForTest }, function (error, results) {
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
                                    .put('/admin/blockUser')
                                    .send('email=' + emailUserForTest)
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(200)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            UserModel.find({ emailUser: emailUserForTest }, function (error, results) {
                                                if (results[0].isBlocked != true)
                                                    throw ("error block user")
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (block --> unblock)', (done) => {
        let emailForTest = "blockUserRoute_2@email.com"
        let emailUserForTest = "blockUserRoute_user2@email.com"

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let user = new UserModel({
            emailUser: emailUserForTest,
            passwordUser: testCorrectPassword,
            isBlocked: true
        })
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        user.passwordUser = bcrypt.hashSync(user.passwordUser, salt)
        admin.save().then(() => {
            user.save().then(() => {
                UserModel.find({ emailPublisher: emailForTest }, function (error, results) {
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
                                    .put('/admin/blockUser')
                                    .send('email=' + emailUserForTest)
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(200)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            UserModel.find({ emailUser: emailUserForTest }, function (error, results) {
                                                if (results[0].isBlocked != false)
                                                    throw ("error unblock user")
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
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('blockUserRoute error cases', () => {

    it('User doesnt exists', (done) => {
        let emailForTest = "blockUserRoute_3@email.com"
        let emailUserForTest = "blockUserRoute_user3@email.com"

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let user = new UserModel({
            emailUser: emailUserForTest,
            passwordUser: testCorrectPassword,
            isBlocked: true
        })
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        user.passwordUser = bcrypt.hashSync(user.passwordUser, salt)
        admin.save().then(() => {
            user.save().then(() => {
                UserModel.find({ emailPublisher: emailForTest }, function (error, results) {
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
                                    .put('/admin/blockUser')
                                    .send('email=' + "blockUserRoute_userFalse@email.com")
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
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})