const request = require('supertest')
const app = require('../src/app')
require('dotenv').config()

test ('Should assert status code is 200', async ()=>{
    await request(app).get('/').expect(200)
})

test ('Should assert PORT is 3000', async ()=>{
    console.log(process.env.PORT)
    const port = process.env.PORT
    expect (port).toBe("3000")
    
})