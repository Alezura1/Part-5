import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display: visible ? 'none' : '' }
    const showing = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hidden}>
                <button onClick={toggleVisibility}>{props.buttonLabelShow}</button>
            </div>
            <div style={showing} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonLabelHide}</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabelShow: PropTypes.string.isRequired,
    buttonLabelHide: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable