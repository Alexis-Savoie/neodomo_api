import "jasmine";
const request = require('supertest');

// Import env variables
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


let API_URL:string = process.env.API_URL!


describe('Test jasmine (admin)', () => {

    it('Test testing (admin)', (done) => {
        request(API_URL)
            .get('/admin/test')
            .set('Accept', 'application/json')
            .expect(200, done)
    })

})