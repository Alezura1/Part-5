import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, createLike, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)
    const hidden = { display: visible ? 'none' : '' }
    const showing = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = async (event) => {
        event.preventDefault()
        const blogObject = {
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: Number(blog.likes) + 1,
            user: blog.user.id
        }
        createLike(blog.id, blogObject)
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        await deleteBlog(blog)
    }

    return(
        <div style={blogStyle}>
            <div style={hidden} className='blog'>
                {blog.title}<br></br>
                {blog.author}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showing} className='blog_with_details'>
                {blog.title} <button onClick={toggleVisibility}>hide</button> <br></br>
                {blog.author} <br></br>
                {blog.url}  <br></br>
                likes: {blog.likes} <button id='like-button' onClick={addLike}>like</button> <br></br>
                {blog.user.name === user.name
                    ? <button id='delete-button' onClick={removeBlog}> delete blog </button>
                    : null
                }
            </div>
        </div>
    )
}

export default Blog