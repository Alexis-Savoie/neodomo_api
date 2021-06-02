// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { ProductModel } from "../../../models/productModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('deleteProductRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "deleteProductRoute_1@email.com"

        let productForTest = {
            nameProduct: "deleteProductRoute_1",
            description: "Ceci est est un test de produit incroyable",
            price: 1000,
            availableStock: 10,
            imageURL: "www.test.com/image.png",
            listBill: [{ id: "jotiobnvznvnzeinicae" }]
        }

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new ProductModel(productForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                ProductModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idProduct = results[0]._id
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
                                    .delete('/admin/deleteProduct')
                                    .send('idProduct=' + idProduct)
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


describe('deleteProductRoute error cases', () => {

    it('Incorrect product id', (done) => {
        let emailForTest = "deleteCommentRoute_2@email.com"
        let productForTest = {
            nameProduct: "deleteProductRoute_1",
            description: "Ceci est est un test de produit incroyable",
            price: 1000,
            availableStock: 10,
            imageURL: "www.test.com/image.png",
            listBill: [{ id: "jotiobnvznvnzeinicae" }]
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let post = new ProductModel(productForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                ProductModel.find({ emailSender: emailForTest }, function (error, results) {
                    let idProduct = results[0]._id
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
                                    .delete('/admin/deleteProduct')
                                    .send('idProduct=' + "60758a57ad3fcd383cd497ce")
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(422)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                ProductModel.findOneAndDelete({ _id: idProduct }, null, function (err, results) {
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