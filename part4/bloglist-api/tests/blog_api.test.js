const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')

const api = supertest(app)

test.only('there are two blogs in the db', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})