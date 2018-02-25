const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML on helppoa'
  },
  {
    title: 'joujoujou'
  }
]

beforeAll(async () => {
  await Blog.remove({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned bloga', async () => {
  const response = await api
    .get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('joujoujou')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the first blog is about HTTP methods', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].title).toBe('HTML on helppoa')
})


afterAll(() => {
  server.close()
})