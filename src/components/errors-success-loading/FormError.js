import React from 'react'
import '../../css/loading-errors-success.css'


const FormError = ({errorMessage}) => {
  return (
    <div className='error-wrapper'>
        <h4 id='login-error' className='error-text'>{errorMessage}</h4>
    </div>
   
  )
}

export default FormError