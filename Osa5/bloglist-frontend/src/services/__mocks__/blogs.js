let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "2017-12-28T16:38:15.541Z",
    url: "ojhppjgojs",
    likes: 0,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "2017-12-28T16:38:15.541Z",
    url: "hohpjpjp",
    likes: 4,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "2017-12-28T16:38:15.541Z",
    url: "oujojpjåjå",
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "2017-12-28T16:38:15.541Z",
    url: "jjpjpoj",
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }