import React from "react";
import firebase from './firebase';

/* 
   Custom hook for user Form
   Can use n amount of values
   values is an object
   */

function useFormValidation(initialState, validate)
{
    const [values, setValues] = React.useState(initialState)
    const [errors, setErrors] = React.useState({});
    const [serverError, setServerError] = React.useState(null);
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        if(isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors)
            {
                //Authentication permitted
                setSubmitting(false);
            } else {
                alert("Errors: ", ...errors);
                setSubmitting(false);
            }
        }
    }, [errors])

    function handleChange(e) 
    {
        if(e)
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function handleBlur()
    {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(e)
    {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        const noErrors = Object.keys(errors).length === 0;
        if(noErrors){
            if(e.target.getAttribute('signup') === 'true')
                handleRegister();
            else
                handleLogin();
        }
        //Error checking is then done server-side by Firebase
        else if(e.target.getAttribute('signup') === 'false')
            handleLogin();
        else
            alert(validationErrors);
    }

    async function handleRegister() {
		try {
            await firebase.register(
                values.name,
                values.email,
                values.password,
                values.country,
                values.number,
                values.age)
		} catch(error) {
            alert(error.message)
            setServerError(error.message);
        }
        firebase.logout();
    }

    async function handleLogin()
    {
        try {
            await firebase.login(values.email, values.password)
        } catch(error) {
            alert(error.message)
            setServerError(error.message)
        }
    }
    

    return { handleSubmit, handleChange, handleBlur, values, errors, serverError, isSubmitting };
}

export default useFormValidation;