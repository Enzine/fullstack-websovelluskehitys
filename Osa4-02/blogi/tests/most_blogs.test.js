const listHelper = require('../utils/list_helper')

describe('author with most blogs ', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlogs = []

  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'blogs':1})
  })
})