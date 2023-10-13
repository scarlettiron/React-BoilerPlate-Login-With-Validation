import React from 'react'
import '../../css/buttons-inputs.css'

const InputPrimary = ({type='text', id, name, placeholder, 
                      error, onChange}) => {
  return (
   <input className = {error && error.name === name ? 'input-primary error' : 'input-primary'} 
          type = {type}
          id = {id}
          name = {name}
          placeholder = {placeholder}
          alt = {placeholder}
          onChange = {onChange}
    />

  )
}

export default InputPrimary