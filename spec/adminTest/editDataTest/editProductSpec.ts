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





describe('editProductRoute success cases', () => {

    it('Correct case with string modifier', (done) => {
        let emailForTest = "editProductRoute1@email.com"
        let nameProductNew = "editProductRouteNew1"
        let productForTest = {
            nameProduct: "editProductRoute1",
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
                ProductModel.find({ nameProduct: productForTest.nameProduct }, function (error, results) {
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
                                    .put('/admin/editProduct')
                                    .send('idProduct=' + idProduct + '&nameProduct=' + nameProductNew)
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(200)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            ProductModel.find({ nameProduct: nameProductNew }, function (error, results) {
                                                if (results == null || results.length == 0)
                                                    throw ("error add product")
                                                AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                    ProductModel.findOneAndDelete({ nameProduct: nameProductNew }, null, function (err, results) {
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

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('editProductRoute error cases', () => {

    it('id doesnt exists', (done) => {
        let emailForTest = "editProductRoute2@email.com"
        let nameProductNew = "editProductRouteNew2"
        let productForTest = {
            nameProduct: "editProductRoute2",
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
                                .put('/admin/editProduct')
                                .send('idProduct=' + "6062ec6a80ad452bd8ba489a" + '&nameProduct=' + nameProductNew)
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(422)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})