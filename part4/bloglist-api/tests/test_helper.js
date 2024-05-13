const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hi',
    author: 'Oleksandr',
    url: 'TEST',
    likes: 1,
  },
  {
    title: 'There',
    author: 'Antonii',
    url: 'TEST',
    likes: 2,
  },
]

const updatedBlog = {
  title: 'this one blog was UPDATED',
  author: 'UPDATED',
  url: 'UPDATED',
  likes: 999,
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb, updatedBlog }
