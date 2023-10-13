import React, {useState} from 'react'
import ButtonPrimary from '../buttons-inputs/ButtonPrimary'
import InputSecondary from '../buttons-inputs/InputSecondary'
import FormLoader from '../errors-success-loading/FormLoader'
import FormError from '../errors-success-loading/FormError'
import FormSuccess from '../errors-success-loading/FormSuccess'
import EmailValidation from '../../utilities/EmailValidation'
import '../../css/forms.css'

//This version uses state to manage user inputs 
//instead of a traditional form, ./LoginV1 uses a form.

const Form2 = ({onSubmit}) => {
    const [loading, setLoading] = useState(() => false)
    const [error, setError] = useState(() => false)
    //Normally redirect to user dashboard and not include this step
    const [success, setSuccess] = useState(() => false)
    //

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSetEmail = (newValue) => {
        setEmail(newValue.target.value)
    }
    const handleSetPassword = (newValue) => {
        setPassword(newValue.target.value)
    }

    const handleLogin = async () => {
        if(error){setError(() => false)}
    
        //handle validation
        if(!email | !EmailValidation(email)){
            setError({message:'Invalid Email'})
            return
        }
        if(!password | password.length < 1){
            setError({message:'Password Required'})
            return
        }

        //proceed with request
        setLoading(() => true)

        const formPayload = {'email':  email.trim(), 
                            'password':password.trim()}

        const {status, data, errors} = await onSubmit(formPayload)

        setLoading(() => false)
        if(errors){
            setError({message:errors})
            return
        }
        if(status === 200){
            setSuccess(() => true)
        } 
    }

  return (
    <div className='form-primary' id='login-form'>
        <h2 className='text-primary'>Login</h2>
        {error && error?.message &&
            <FormError errorMessage = {error.message}/>
        }

        {!loading && !success &&
        <div className='w-100 justify-content-center flex-wrap'>
            <InputSecondary
            id = 'username' 
            name = 'username'
            error = {error}
            onChange = {(e) => {handleSetEmail(e)}}
            placeholder = 'Username / Email'
            value = {email}
            />

            <InputSecondary
            id = 'password'
            name = 'password'
            error = {error}
            type = 'password'
            onChange = {(e) => {handleSetPassword(e)}}
            placeholder = 'Password'
            value = {password}
            />

            <ButtonPrimary text='Login' form='login-form' 
                            type='submit' onClick={handleLogin}/>
            
            <div className='justify-content-space-around w-100'>
                <h5 className='text-muted'>Forgot Username</h5>
                <h5 className='text-muted'>Forgot Password</h5>
            </div>
        </div>
        }

        {loading &&
            <FormLoader/>
        }
        {success &&
            <FormSuccess/>
        }

    </div>
  )
}

export default Form2