import React from 'react'
import '../../css/buttons-inputs.css'

const ButtonPrimary = ({form = null, onClick = null, 
                        onChange = null, type='button', text}) => {
  return (
    <button className='btn-primary'
            form = {form}
            onClick = {onClick}
            onChange={onChange}
            type={type}
            >
        {text}
    </button>
  )
}

export default ButtonPrimary