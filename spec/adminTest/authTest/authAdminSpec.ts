// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });


let API_URL: string = process.env.API_URL!

let testCorrectPassword = "bonjour123"
let testIncorrectPassword = "bonjour1234"

describe('authAdminRoute', () => {


    it('Correct case', (done) => {
        let emailForTest = "authAdminRoute_1@email.com"
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
                .expect(200, done)
        })
    })





    it('Correct case', (done) => {
        let emailForTest = "authAdminRoute_2@email.com"
        let emailForTestFalse = "authAdminRoute_false@email.com"
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
                .send('email=' + emailForTestFalse + '&password=' + testCorrectPassword)
                .set('Accept', 'application/json')
                .expect(400, done)
        })
    })
    
})