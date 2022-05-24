import React from 'react'
import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const addUser = async (event) => {
        event.preventDefault()
        loginUser(username, password)
        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <h2>Login</h2>
            
            <form onSubmit={addUser}>
                <div> username: <input id='username' type="text" value={username} onChange={handleUsernameChange}/> </div>
                <div> password: <input id='password' type="password" value={password} onChange={handlePasswordChange}/> </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm