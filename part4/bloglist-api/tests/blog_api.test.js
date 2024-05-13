const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const { initialBlogs, blogsInDb, updatedBlog } = require('./test_helper')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    // console.log('DB cleared')
    await Blog.insertMany(initialBlogs)
    // console.log('Saved')
  })

  describe('viewing blogs', () => {
    test('there are two blogs in the db', async () => {
      const { body } = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(body.length, initialBlogs.length)
    })
  })

  describe('verifying a fields of object', () => {
    test('unique identifier property of the blog posts is named id', async () => {
      const { body } = await api.get('/api/blogs')
      const isWithId = body.every((blog) => blog.hasOwnProperty('id'))

      assert.strictEqual(isWithId, true)
    })
  })

  describe('addition of a new note', () => {
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
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await blogsInDb()

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

      // const contents = notesAtEnd.map(r => r.content)
      // assert(!contents.includes(noteToDelete.content))
    })
  })
})

describe.only('updating a blog', () => {
  test.only('succeds with status code 200 if id and body is valid', async () => {
    const blogs = await blogsInDb()
    const blogToUpdate = blogs[0]
    console.log(blogToUpdate)
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    console.log(response)
  })
})

after(async () => {
  await mongoose.connection.close()
})
