export default function validateEdit(values) {
    let errors = {};
    //Name errors
    if(!values.name)
    {
        errors.name = "Name is required";
    } else if(!/^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.name))
        errors.name = "Invalid name";
    //Country errors
    if(!values.country)
    {
        errors.country = "Country is required!";
    } else if(!/^[A-Z]{2,2}$/i.test(values.country))
        errors.country = "Bad country code formatting.";

    return errors;
}