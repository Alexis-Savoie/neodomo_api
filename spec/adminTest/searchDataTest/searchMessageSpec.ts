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





describe('searchMessageRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchMessageRoute_1@email.com"
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
        let message = new MessageModel(messageForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            message.save().then(() => {
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
                                .post('/admin/searchMessage')
                                .send('emailSender=' + "searchMessageRoute")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (!res.body.messages) {
                                            throw ("err messages")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            MessageModel.findOneAndDelete({ emailSender: emailForTest }, null, function (err, results) {
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

