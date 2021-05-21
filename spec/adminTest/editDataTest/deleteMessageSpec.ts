// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { MessageModel } from "../../../models/messageModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('deleteMessageRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "deleteMessageRoute_1@email.com"

        let messageForTest = {
            emailSender: emailForTest,
            emailReceiver: "searchMessageRoute_999@email.com",
            textContent: "Ceci est est un test de message incroyable",
            imageURL: "http://serveur.fr/image.png",
        }

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new MessageModel(messageForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                MessageModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idMessage = results[0]._id
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
                                    .delete('/admin/deleteMessage')
                                    .send('idMessage=' + idMessage)
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
        let messageForTest = {
            emailSender: emailForTest,
            emailReceiver: "searchMessageRoute_999@email.com",
            textContent: "Ceci est est un test de message incroyable",
            imageURL: "http://serveur.fr/image.png",
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new MessageModel(messageForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                MessageModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idMessage = results[0]._id
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
                                    .delete('/admin/deleteMessage')
                                    .send('idPost=' + "60758a57ad3fcd383cd497ce")
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(422)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                MessageModel.findOneAndDelete({ _id: idMessage }, null, function (err, results) {
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