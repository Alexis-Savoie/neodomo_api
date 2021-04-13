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





describe('searchPostRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchPostRoute_1@email.com"
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
                                .post('/admin/searchPost')
                                .send('emailPublisher=' + "searchPostRoute")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (!res.body.posts) {
                                            throw ("err posts")
                                        }
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (empty)', (done) => {
        let emailForTest = "searchPostRoute_2@email.com"
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
                                .post('/admin/searchPost')
                                .send('emailPublisher=' + "searchPostRouteNo")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (res.body.posts) {
                                            throw ("err posts")
                                        }
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (boolean operator)', (done) => {
        let emailForTest = "searchPostRoute_3@email.com"
        let postForTest = {
            emailPublisher: emailForTest,
            textContent: "Ceci est est un test de post incroyableee",
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
                                .post('/admin/searchPost')
                                .send('haveReport=' + "0")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (res.body.posts) {
                                            throw ("err posts")
                                        }
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (date operator)', (done) => {
        let emailForTest = "searchPostRoute_3@email.com"
        let postForTest = {
            emailPublisher: emailForTest,
            textContent: "Ceci est est un test de post incroyableee",
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
                                .post('/admin/searchPost')
                                .send('createdAtAt=' + "2000-01-01")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (res.body.posts) {
                                            throw ("err posts")
                                        }
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('searchPostRoute error cases', () => {



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})