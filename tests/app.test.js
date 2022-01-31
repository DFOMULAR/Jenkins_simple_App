const request = require('supertest')
const app = require('../src/app')


test ('Should assert status code is 200', async ()=>{
    await request(app).get('/').expect(200)
})