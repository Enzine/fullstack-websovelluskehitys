import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('Blog ', () => {
  let user, blog, blogComponent

  user = {
    username: "user",
    name: "name"
  }

  blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 2,
    user: user
  }

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} user={user} />)
  })

  it('renders correct fields', () => {
    const nameDiv = blogComponent.find('.name')
    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)

    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking title the details are displayed', () => {
    const nameDiv = blogComponent.find('.name')
    nameDiv.at(0).simulate('click')

    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: '' })
    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(user.name)
  })  
})