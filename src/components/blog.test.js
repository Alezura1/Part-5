import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './blog'

const blog = {
    author: 'AuthorTester',
    title: 'Title Testing',
    url: 'www.testurl.com',
    likes: 5,
    user: {
        username: 'Testerman',
        name: 'Testerman'
    }
}

const user = {
    username: 'Testerman',
    name: 'Testerman'
}

test('A blog renders the title and author, but not url and likes, by default', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
        blog.author, blog.title
    )

    expect(div).not.toHaveTextContent(
        blog.url, blog.likes
    )
})

test('A blog renders the url and likes after pressing the details button ', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog_with_details')

    const button = screen.getByText('view')

    userEvent.click(button)

    expect(div).toHaveTextContent(
        blog.url, blog.likes
    )
})

test('If the like button is pressed twice,the buttonhandler is called twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} createLike={mockHandler} />)

    const button = screen.getByText('like')

    userEvent.click(button)
    userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

})