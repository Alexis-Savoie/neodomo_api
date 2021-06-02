// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { CommentModel } from "../../../models/commentModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('deleteCommentRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "deleteCommentRoute_1@email.com"

        let commentForTest = {
            idPost: "dzefagrddvzqzdgerzvfzerg",
            emailSender: emailForTest,
            textContent: "Ceci est est un test de post incroyable",
            replyTo: "dzefagrddvzqedgerzvfzerg",
            haveReport: false
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new CommentModel(commentForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                CommentModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idComment = results[0]._id
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
                                    .delete('/admin/deleteComment')
                                    .send('idComment=' + idComment)
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
    })


})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('deleteCommentRoute error cases', () => {

    it('Incorrect comment id', (done) => {
        let emailForTest = "deleteCommentRoute_2@email.com"
        let commentForTest = {
            idPost: "dzefagrddvzqzdgerzvfzerg",
            emailSender: emailForTest,
            textContent: "Ceci est est un test de post incroyable",
            replyTo: "dzefagrddvzqedgerzvfzerg",
            haveReport: false
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new CommentModel(commentForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                CommentModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idComment = results[0]._id
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
                                    .delete('/admin/deletePost')
                                    .send('idPost=' + "60758a57ad3fcd383cd497ce")
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(422)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                CommentModel.findOneAndDelete({ _id: idComment }, null, function (err, results) {
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