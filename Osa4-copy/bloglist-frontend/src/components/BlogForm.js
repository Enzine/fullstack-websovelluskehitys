import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: 
          <input
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            name='author'
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            name='url'
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequiredS
}

export default BlogForm