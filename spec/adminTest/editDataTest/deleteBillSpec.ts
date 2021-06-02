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





describe('deleteBillRoute success cases', () => {

    it('Correct case', (done) => {
        let emailForTest = "deleteBillRoute_1@email.com"
        let numberBill = 75875

        let billForTest = {
            numberBill: numberBill,
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
        let post = new BillModel(billForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                BillModel.find({ numberBill: numberBill }, function (error, results) {
                    let idBill = results[0]._id
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
                                    .delete('/admin/deleteBill')
                                    .send('idBill=' + idBill)
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


describe('deleteBillRoute error cases', () => {

    it('Incorrect product id', (done) => {
        let emailForTest = "deleteBillRoute_2@email.com"
        let numberBill = 75876

        let billForTest = {
            numberBill: numberBill,
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
        let post = new BillModel(billForTest)
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
        admin.save().then(() => {
            post.save().then(() => {
                BillModel.find({ numberBill: numberBill }, function (error, results) {
                    let idBill = results[0]._id
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
                                    .delete('/admin/deleteBill')
                                    .send('idBill=' + "60758a57ad3fcd383cd497ce")
                                    .set('Accept', 'application/json')
                                    .set('Authorization', 'Bearer ' + token)
                                    .expect(422)
                                    .end(function (err: any, res: any) {
                                        if (err) throw err;
                                        else {
                                            AdminModel.findOneAndDelete({ emailAdmin: emailForTest }, null, function (err, results) {
                                                BillModel.findOneAndDelete({ _id: idBill }, null, function (err, results) {
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