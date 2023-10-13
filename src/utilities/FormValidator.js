//parameters: form  and optionalInput fields
// loops through all of the form input fields 
// optionalInputs takes an array of element ID's
// when looping through elements, compare current element to 
//values in optionalInputs to see if element id is in optionalInputs   
//Takes in form
// Returns if form passes and what errors if any

const ValidateForm = (form, optionalInputs = [], ) => {
    let pass = true;
    let errorField = null;

    for (const element of form.target.elements) {
        let isOptional = optionalInputs.includes(element.id)
        if(!element.value && !isOptional && element.type !== 'submit'){
            pass = false
            errorField = element.name
            return {pass, errorField}
        }
    }

    return {pass, errorField}
}

export default ValidateForm