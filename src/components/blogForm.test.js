import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

test('The blog form calls the event handler with right details when a new blog is created', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title-input')
    const authorInput = screen.getByPlaceholderText('author-input')
    const urlInput = screen.getByPlaceholderText('url-input')

    const createButton = screen.getByText('add a new blog')

    userEvent.type(titleInput, 'Testing the test')
    userEvent.type(authorInput, 'Author Tester')
    userEvent.type(urlInput, 'www.testingthetest.com')

    userEvent.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing the test')
    expect(createBlog.mock.calls[0][0].author).toBe('Author Tester')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testingthetest.com')
    
}) 