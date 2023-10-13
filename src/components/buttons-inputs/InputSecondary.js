import React from 'react'

const InputSecondary = ({type='text', id, name, placeholder, 
                        error, onChange, value}) => {
        return (
            <input className = {error && error.name === name ? 'input-primary error' : 'input-primary'} 
            type = {type}
            id = {id}
            name = {name}
            placeholder = {placeholder}
            alt = {placeholder}
            onChange = {onChange}
            value={value}
            />

  )
}

export default InputSecondary