const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes,
  }

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter