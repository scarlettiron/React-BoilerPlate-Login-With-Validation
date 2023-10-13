
//Takes in an email input
//returns true if email is valid, false otherwise

const EmailValidation = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return true
    }

      return false
}

export default EmailValidation