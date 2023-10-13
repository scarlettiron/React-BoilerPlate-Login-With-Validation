import React from 'react'
import axios from 'axios'
import Form1 from './Form1'
import Form2 from './Form2'
import '../../css/forms.css'


const Login = () => {

    const handleLogin = async (formPayload) => {
        try{
            const response = await axios.post('https://reqres.in/api/login', formPayload)

            const status = response.status
            const statusText = response.statusText
            const data = await response.data
            //Store tokens and handle successful user login
            return {status:status, data:data, errors:false}
        }
        catch(error){
            return {errors:error.response.data.error, data:null,  status:400}
        }

    }

  return (
    /* Version using form submit for user input */
    <Form1 onSubmit={handleLogin} />

    /* Version using state to store user input */
    /* <Form2 onSubmit={handleLogin} /> */
  
    )
}

export default React.memo(Login)