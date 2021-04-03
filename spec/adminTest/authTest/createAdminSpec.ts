// Import npm modules
import "jasmine";
const request = require('supertest');

// Import models
import { AdminModel } from "../../../models/adminModel"

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


let API_URL:string = process.env.API_URL!
let testCorrectEmail = "testAdmin@email.com"
let testCorrectPassword = "bonjour123"


describe('createAdminRoute', () => {

    beforeEach(async function () {
        await Promise.resolve()
      });

    it('Correct case', async(done) => {
        request(API_URL)
            .post('/admin/createAdmin')
            .send('email=' + testCorrectEmail + '&password=' + testCorrectPassword)
            .set('Accept', 'application/json')
            .expect(201)
            await AdminModel.deleteOne({adminEmail : testCorrectEmail})
            done()
            console.log("createAdmin")
            await Promise.resolve()

    })



})