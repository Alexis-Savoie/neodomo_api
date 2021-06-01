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





describe('searchProductRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchProductRoute_1@email.com"
        let productForTest = {
            nameProduct: "searchProductRoute_1",
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
        let product = new ProductModel(productForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            product.save().then(() => {
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
                                .post('/admin/searchProduct')
                                .send('nameProduct=' + "searchProductRoute")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (!res.body.products) {
                                            throw ("err search products")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            ProductModel.findOneAndDelete({ nameProduct: productForTest.nameProduct }, null, function (err, results) {
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (number operator)', (done) => {
        let emailForTest = "searchProductRoute_2@email.com"
        let productForTest = {
            nameProduct: "searchProductRoute_2",
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
        let product = new ProductModel(productForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            product.save().then(() => {
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
                                .post('/admin/searchProduct')
                                .send('priceMin=' + "1100")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (res.body.products) {
                                            throw ("err search products")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            ProductModel.findOneAndDelete({ nameProduct: productForTest.nameProduct }, null, function (err, results) {
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    it('Correct case (search array length)', (done) => {
        let emailForTest = "searchProductRoute_3@email.com"
        let productForTest = {
            nameProduct: "searchProductRoute3",
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
        let product = new ProductModel(productForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            product.save().then(() => {
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
                                .post('/admin/searchProduct')
                                .send('nbSellMin=' + "2")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (res.body.products) {
                                            throw ("err search products")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            ProductModel.findOneAndDelete({ nameProduct: productForTest.nameProduct }, null, function (err, results) {
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

