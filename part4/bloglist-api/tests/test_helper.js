const Blog = require("../models/blog")

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
