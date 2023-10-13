import React from 'react'
import '../../css/loading-errors-success.css'

const FormLoader = () => {
  return (
    <div id='loader' className='form-loader-container'>
        <div className='form-loader'>
          <div className='lds-wrapper'>
            <div className="lds-roller lds-form"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
    </div>
  )
}

export default FormLoader