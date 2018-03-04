import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      message: null,
      error: null,
      username: '',
      password: '',
      user: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ 
        message: `Tervetuloa ${user.username}!`,
        username: '', 
        password: '', 
        user })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    this.setState({
      message: 'Kirjauduttu ulos onnistuneesti!',
      user: null
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      const newBlog = await blogService.create(blogObject)
      this.setState({ 
        message: 'Uusi blogi lisätty onnistuneesti!',
        title: '', 
        author: '', 
        url: '',
        blogs: this.state.blogs.concat(blogObject)
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Virhe lisättäessä uutta blogia'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }  

  render() {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    if (this.state.user === null) {
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm 
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />
        <p>{this.state.user.name} is logged in<button onClick={this.logout}>Logout</button></p>
        <div>
          <BlogForm
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleChange={this.handleFieldChange}
            handleSubmit={this.addBlog}
          />
        </div>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
