import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog ', () => {
    it('renders correct fields', () => {
        const blog = {
            title: 'title',
            author: 'author',
            likes: 2
        }
        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const nameDiv = blogComponent.find('.name')
        const contentDiv = blogComponent.find('.content')

        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })
    it('clicking the like button twice calls event handler twice', () => {
        const blog = {
            title: 'title',
            author: 'author',
            likes: 2
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})