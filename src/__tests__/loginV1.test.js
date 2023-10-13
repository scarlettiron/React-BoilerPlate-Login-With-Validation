import {render, screen, queryByAttribute, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import EmailValidation from '../utilities/EmailValidation';
import Form1 from '../components/forms/Form1';

const getById = queryByAttribute.bind(null, 'id')

const mock = jest.fn()

const userLoginData = {email:'eve.holt@reqres.in',
                        password:'cityslicka'}



beforeEach(() => {
    mock.mockClear()

})


// returns an object containing status if not successful
// returns an object containing status and token if successful
const testFetchResponseLoginLocal = async (username, password) => {
    if(password.length < 1){return {status:400}}
    
    const isValidUsername = EmailValidation(username)
    if(!isValidUsername){return {status:400, errors:'invalid login'}}
    
    if(username !== userLoginData.email | password !== userLoginData.password){
        return {status:400, errors:'invalid login'}
    }
    //if valid username and password length is greater than 1
    return {status:200, data:{token:'auth token'}}
}

// Valid Login Test V1 //
//Goes through login flow using correct credentials
//uses testFetchResponseLoginLocal for api response

it('successful login using local method as api', async () => {
    //mock onSubmit for form
    const Submit = mock.mockImplementation(
        async (payload) => {
            const response = await testFetchResponseLoginLocal(payload.email, payload.password)
            if(response.status === 200){
                return {status:200, errors:false, data:response.data}
            }
            return {status:response.status, errors:'invalid login', data:false}
        }
    ) //

    const view = render(<Form1 onSubmit={Submit}/>)
    const usernameInput = getById(view.container, 'username')

    const passwordInput = getById(view.container, 'password')
    const submitBtn = screen.getByRole('button', {type:'submit'})
    
    // add user input for fields
    userEvent.clear(usernameInput)
    userEvent.clear(passwordInput)
    userEvent.type(usernameInput, userLoginData.email)
    userEvent.type(passwordInput, userLoginData.password)

    userEvent.click(submitBtn)
  
    //check to see if function is running multiple times
    await waitFor(() => {
        expect(Submit).toHaveBeenCalledTimes(1)
    })  
    
   //check if correct data was passed into Submit
   await waitFor(() => {
        expect(Submit).toHaveBeenCalledWith(userLoginData)
    }) 

    await waitFor(() => {
        const successPopup = getById(view.container, 'login-success')
        expect(successPopup).toBeInTheDocument()
    })

    await waitFor(() => {
        const errorPopup = getById(view.container, 'login-error')
        expect(errorPopup).not.toBeInTheDocument()
    })

    await waitFor(() => {
        const loader = getById(view.container, 'loader')
        expect(loader).not.toBeInTheDocument()
    })

    
})


// Invalid Login Test V1 //

it('invalid login', async () => {
    //mock onSubmit for form
    const Submit = mock.mockImplementation(
        async (payload) => {
            const response = await testFetchResponseLoginLocal(payload.email, payload.password)
            if(response.status === 200){
                return {status:200, errors:false, data:response.data}
            }
            return {status:response.status, errors:'invalid login', data:false}
        }
    ) //

    const view = render(<Form1 onSubmit={Submit}/>)
    const usernameInput = getById(view.container, 'username')

    const passwordInput = getById(view.container, 'password')
    const submitBtn = screen.getByRole('button', {type:'submit'})
    
    // add user input for fields
    userEvent.clear(usernameInput)
    userEvent.clear(passwordInput)
    userEvent.type(usernameInput, 's@gmail.com')
    userEvent.type(passwordInput, 'invalid password')

    userEvent.click(submitBtn)
  
    //check to see if function is running multiple times
    await waitFor(() => {
        expect(Submit).toHaveBeenCalledTimes(1)
    })  
    
   //check if correct data was passed into Submit
   await waitFor(() => {
        expect(Submit).toHaveBeenCalledWith({email:'s@gmail.com', password:'invalid password'})
    }) 

    await waitFor(() => {
        const successPopup = getById(view.container, 'login-success')
        expect(successPopup).not.toBeInTheDocument()
    })

    await waitFor(() => {
        const errorPopup = getById(view.container, 'login-error')
        expect(errorPopup).toBeInTheDocument()
    })

    await waitFor(() => {
        const loader = getById(view.container, 'loader')
        expect(loader).not.toBeInTheDocument()
    })

}) 






 