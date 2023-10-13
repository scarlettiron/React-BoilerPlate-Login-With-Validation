import React, {useState} from 'react'
import ButtonPrimary from '../buttons-inputs/ButtonPrimary'
import InputPrimary from '../buttons-inputs/InputPrimary'
import FormLoader from '../errors-success-loading/FormLoader'
import FormError from '../errors-success-loading/FormError'
import FormSuccess from '../errors-success-loading/FormSuccess'
import FormValidator from '../../utilities/FormValidator'
import EmailValidation from '../../utilities/EmailValidation'

//This version does not use React state hooks to manage user input
//however version 2 ./Form2 does.
//This version uses the form's default onSubmit which prevents the 
//component from rerendering multiple times

const Form1 = ({onSubmit}) => {
    const [error, setError] = useState(() => false)
    //Normally redirect to user dashboard and not include this step
    const [success, setSuccess] = useState(() => false) 
    const [loading, setLoading] = useState(() => false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(error){setError(() => false)} 

        //validate form data
        //for larger forms I use the FormValidator I built and
        //included in /src/utilities, which shortens code by
        //by going through all form fields and checking for input
        //and returning an error if there is none 
        //except for optional inputs passed in as optionalInputs = []

        const {pass, errorField} = FormValidator(e)

        const {username, password} = e.target.elements

        if(!pass){
            setError({'name':{errorField},'message':`Provide valid ${errorField}`})
            return 
        }
        

        if(!EmailValidation(username.value)){
            setError({'name':'email','message':`Provide a valid email`})
            return 
        }

        setLoading(() => true)

        const formPayload = {'email':  username.value.trim(), 
                            'password': password.value.trim()}
   

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
    <form className='form-primary' id='login-form' data-testid='loginform' onSubmit={handleSubmit}>
        <h2 className='text-primary'>Login</h2>
        {error &&
            <FormError errorMessage = {error?.message}/>
        }

        {!loading && !success &&
        <div className='w-100 justify-content-center flex-wrap'>
            <InputPrimary 
            id = 'username' 
            name = 'username'
            error = {error}
            placeholder = 'Username / Email'
            />

            <InputPrimary
            id = 'password'
            name = 'password'
            error = {error}
            type = 'password'
            placeholder = 'Password'
            />
            
            <ButtonPrimary text='Login' form='login-form' type='submit'/>
            
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

    </form>
  )
}
export default Form1