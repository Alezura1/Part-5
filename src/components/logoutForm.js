import React from 'react'

const LogOutForm = ({ handleLogout }) => {
    return(
        <form onSubmit={handleLogout}>
            <div>
                <button type="logout">logout</button>
            </div>
        </form>
    )
}

export default LogOutForm