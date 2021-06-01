// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"
import { BillModel } from "../../../models/billModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"





fdescribe('searchBillRoute success cases', () => {

    it('Correct case (string operator)', (done) => {
        let emailForTest = "searchBillRoute_1@email.com"
        let billForTest = {
            numberBill: 9991,
            emailBuyer: "searchBillRoute_user1@email.com",
            description: "300 Domo",
            price: 3.0,
            paymentMethod: "CB",
            idProduct: "vnozehvineozjoejajc"
        }
        // Create an admin for the test
        let admin = new AdminModel({
            emailAdmin: emailForTest,
            passwordAdmin: testCorrectPassword
        })
        let bill = new BillModel(billForTest)
        
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
                                .post('/admin/searchBill')
                                .send('emailBuyer=' + "searchBillRoute")
                                .set('Accept', 'application/json')
                                .set('Authorization', 'Bearer ' + token)
                                .expect(200)
                                .end(function (err: any, res: any) {
                                    if (err) throw err;
                                    else {
                                        if (!res.body.bills) {
                                            throw ("err bill search")
                                        }
                                        AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                            BillModel.findOneAndDelete({ emailBuyer: billForTest.emailBuyer }, null, function (err, results) {
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

