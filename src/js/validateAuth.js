export default function validateAuth(values) {
    let errors = {};
    //Email errors
    if (!values.email) {
        errors.email = 'Email is required';
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = 'Invalid email address';
    }
    //Password errors
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    } else if (values.password !== values.passwordRpt){
        errors.password = "Repeated password is not the same";
    }
    //Name errors
    if(!values.name)
    {
        errors.name = "Name is required";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name))
        errors.name = "Invalid name";
    return errors;
}