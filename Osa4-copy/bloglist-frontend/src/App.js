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

  like = (id) => {
    return async () => {
      const oldBlog = this.state.blogs.find(b => b._id === id) 
      const newBlog = {
        title: oldBlog.title, 
        author: oldBlog.author, 
        url: oldBlog.url, 
        likes: oldBlog.likes + 1, 
        user: oldBlog.user 
      }
      try {
        await blogService.update(id, newBlog)
        this.setState({ message: 'Tykkäsit juuri blogista!' })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      } catch (exception) {
        this.setState({ error: 'Blogin tykkääminen ei nyt onnistunut' })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
    }
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

  deleteBlog = (id) => {
    return async () => {
      const blogToRemove = this.state.blogs.find(b => b._id === id)
      if (!window.confirm(`Poistetaanko blogi ${blogToRemove.title}?`)) return
      try {
        await blogService.erase(id)
        this.setState({
          message: `Poistettiin '${blogToRemove.title}'`,
          blogs: this.state.blogs.filter(e => !e.title.includes(blogToRemove.title))
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 3000)
      } catch (exception) {
        this.setState({ error: 'Ongelmia blogin poistamisessa' })
        setTimeout(() => {
          this.setState({ error: null })
        }, 3000)
      }
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }  

  render() {
    const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    let sortedBlogs = this.state.blogs
      .sort((a,b) => {
      if (a.likes !== b.likes) {
        return b.likes - a.likes
      }
      return 0
    })

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
        {sortedBlogs.map(blog =>
          <div>
            <Blog key={blog._id} blog={blog} />
            <Togglable 
              buttonLabel="paljasta">
              <p>Title: {blog.title}</p>
              <p>Author: {blog.author}</p>
              <p>Url: {blog.url}</p>
              <p>Likes: {blog.likes} <button onClick={this.like(blog._id)}>like!</button></p>
            </Togglable>
            <button onClick={this.deleteBlog(blog._id)}>delete</button>
          </div>
        )}
      </div>
    )
  }
}

export default App
