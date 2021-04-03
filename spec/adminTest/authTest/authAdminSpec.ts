// Import npm modules
import "jasmine";
const request = require('supertest');
import bcrypt from 'bcrypt'

// Import models
import { AdminModel } from "../../../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


let API_URL:string = process.env.API_URL!
let testCorrectEmail = "testAdmin@email.com"
let testCorrectPassword = "bonjour123"
let testIncorrectPassword = "bonjour1234"

describe('authAdminSpec', () => {

    beforeEach(async function () {
        await Promise.resolve()
      });

    it('Correct case', async(done) => {
        
        request(API_URL)
            // Create an admin for the test
            let admin = new AdminModel({
                emailAdmin: testCorrectEmail,
                passwordAdmin: testCorrectPassword
            })
            // Hash the password
            const salt = bcrypt.genSaltSync(10)
            admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
            await admin.save()
            .post('/admin/login')
            .send('email=' + testCorrectEmail + '&password=' + testCorrectPassword)
            .set('Accept', 'application/json')
            .expect(200)
            // Remove the admin now that the test is done
            await AdminModel.deleteOne({adminEmail : testCorrectEmail})
            done()
            console.log("authAdmin")
            await Promise.resolve()
    })


    it('Incorrect creditentials.', async(done) => {
        
        request(API_URL)
            // Create an admin for the test
            let admin = new AdminModel({
                emailAdmin: testCorrectEmail,
                passwordAdmin: testCorrectPassword
            })
            // Hash the password
            const salt = bcrypt.genSaltSync(10)
            admin.passwordAdmin = bcrypt.hashSync(admin.passwordAdmin, salt)
            await admin.save()
            .post('/admin/login')
            .send('email=' + testCorrectEmail + '&password=' + testIncorrectPassword )
            .set('Accept', 'application/json')
            .expect(400)
            // Remove the admin now that the test is done
            await AdminModel.deleteOne({adminEmail : testCorrectEmail})
            done()
            console.log("authAdmin2")
            await Promise.resolve()
    })
})