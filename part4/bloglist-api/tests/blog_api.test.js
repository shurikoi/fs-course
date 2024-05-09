const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("DB cleared")
  await Blog.insertMany(initialBlogs)
  console.log("Saved")
})

test('there are two blogs in the db', async () => {
  const { body } = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(body.length, initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const { body } = await api.get('/api/blogs')
  const isWithId = body.every((blog) => blog.hasOwnProperty('id'))

  assert.strictEqual(isWithId, true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'TEST',
    author: 'TEST',
    url: 'TEST',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await api.get('/api/blogs')
  assert.strictEqual(allBlogs.body.length, initialBlogs.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})
