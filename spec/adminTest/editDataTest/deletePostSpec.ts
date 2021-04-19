// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { PostModel } from "../../../models/postModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('deletePostRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "deletePostRoute_1@email.com"
        let postForTest = {
            emailPublisher: emailForTest,
            textContent: "Ceci est est un test de post incroyable",
            listImage: [{ URL: "www.test.com/image.png" }],
            listLike: [{ id: "hogzjovfzegvivzniovz" }],
            listComment: [{ id: "hogzjovznjoivzniovz" }],
            listReport: [{ id: "jotiobnvznvnzeinicae" }]
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new PostModel(postForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                PostModel.find({ emailPublisher: emailForTest }, function (error, results) {
                    let idPost = results[0]._id
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
                                    .send('idPost=' + idPost)
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


describe('deletePostRoute error cases', () => {

    it('Incorrect post id', (done) => {
        let emailForTest = "deletePostRoute_2@email.com"
        let postForTest = {
            emailPublisher: emailForTest,
            textContent: "Ceci est est un test de post incroyablee",
            listImage: [{ URL: "www.test.com/image.png" }],
            listLike: [{ id: "hogzjovfzegvivzniovz" }],
            listComment: [{ id: "hogzjovznjoivzniovz" }],
            listReport: [{ id: "jotiobnvznvnzeinicae" }]
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new PostModel(postForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                PostModel.find({ emailPublisher: emailForTest }, function (error, results) {
                    let idPost = results[0]._id
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
                                                PostModel.findOneAndDelete({ emailPublisher: emailForTest }, null, function (err, results) {
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