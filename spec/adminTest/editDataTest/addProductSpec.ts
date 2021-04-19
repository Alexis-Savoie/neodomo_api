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





describe('addProductRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "addProductRoute_1@email.com"
        let emailUserForTest = "addProductRoute_user1@email.com"

        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {

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
                            .post('/admin/addProduct')
                            .send('nameProduct=' + "produitTest" + '&description=' + "Description test" + '&price=' + "1000" + "&imageURL=" + "http://test.com/image.png" + "&availableStock=" + "10")
                            .set('Accept', 'application/json')
                            .set('Authorization', 'Bearer ' + token)
                            .expect(201)
                            .end(function (err: any, res: any) {
                                if (err) throw err;
                                else {
                                    ProductModel.find({ nameProduct: "produitTest" }, function (error, results) {
                                        if (results == null || results.length == 0)
                                            throw ("error add product")
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            ProductModel.findOneAndDelete({ nameProduct: "produitTest" }, null, function (err, results) {
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe('addProductRoute error cases', () => {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})