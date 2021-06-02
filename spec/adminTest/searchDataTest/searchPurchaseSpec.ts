// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { PurchaseModel } from "../../../models/purchaseModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





describe('searchPurchaseRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchPurchaseRoute_1@email.com"

        let purchaseForTest = {
            emailBuyer: emailForTest,
            quantity: 1,
            price: 500,
            idProduct: "jotiaanvznvnzeinicaz"
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let bill = new PurchaseModel(purchaseForTest)
        
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            bill.save().then(() => {
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
                                .post('/admin/searchPurchase')
                                .send('emailBuyer=' + emailForTest)
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (!res.body.purchases) {
                                            throw ("err purchase search")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            PurchaseModel.findOneAndDelete({ emailBuyer: emailForTest }, null, function (err, results) {
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

