const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    isAdult: user.isAdult
  }
}

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map(formatUser)) 
  } catch (exception) {
    console.log(exception)
    response.status(404).send({ error: 'GET /users not found' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      response.status(400).json({ error: 'password must be at least 3 letters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      isAdult: body.isAdult ? body.isAdult : true,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter