import React from 'react';
import '../stylesheets/style.css';
import '../stylesheets/bootstrap.css';
import '../fonts/fonts.css';
import loginVideo from '../images/slowfront.mov';
import '../js/loginLogic';
import useFormValidation from '../js/useFormValidation';
import validateAuth from "../js/validateAuth";

function Form(props){

    const INITIAL_STATE = {
        name: "",
        email: "",
        password: "",
        passwordRpt: "",
        signUp: false,
        country: "",
        number: "",
        age: "",
        /* @TODO 
        Additional info
        Age,
        Number
        Required or not??
        */
    }
    const { 
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        //errors,
        //serverError,
        //isSubmitting
    } = useFormValidation(INITIAL_STATE, validateAuth);
    
	return (    //@TODO IMPLEMENT ERROR DISPLAY IN UI
        <React.Fragment>
            <div className="logo centerHorizontally"></div>
            <video autoPlay muted loop id="myVideo">
                <source src={loginVideo} type="video/mp4"/>
            </video>
            <div id="loginHome" className='home'>
                <main>
                    <div className="container">
                        <form id ="post_form">
                            <div className="form-group left">
                                <label className="labelis" htmlFor="emailInput">Email</label>
                                <input type="email" className="form-control initial-forms" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} id="email"
                                aria-describedby="emailHelp" placeholder="Enter email" required/>
                            </div>
                            <div className="form-group right">
                                <label className="labelis" htmlFor="passwordInput">Password</label>
                                <input id="psw-first" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="form-control initial-forms"
                                placeholder="Password" required/>
                            </div>
                            <div id="name-form" className="form-group display-none left">
                                <label className="labelis" htmlFor="name">Name</label>
                                <input id="name" type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className="form-control txt-block" placeholder="Your name" required="@"/>
                            </div>
                            <div id="psw-repeat-form" className="form-group display-none right">
                                <label className="labelis" htmlFor="password">Repeat</label>
                                <input id="psw-repeat" type="password" name="passwordRpt" value={values.passwordRpt} onChange={handleChange} onBlur={handleBlur} className="form-control txt-block" placeholder="Repeat password" required/>
                            </div>
                            <div id="age-form" className="form-group display-none left">
                                <label className="labelis" htmlFor="age">Age</label>
                                <input id="age" type="text" name="age" value={values.age} onChange={handleChange} onBlur={handleBlur} className="form-control txt-block" placeholder="Age" required/>
                            </div>
                            <div id="car-model-form" className="form-group display-none right">
                                <label className="labelis" htmlFor="model">Number</label>
                                <input id="number" type="text" name="number" value={values.number} onChange={handleChange} onBlur={handleBlur} className="form-control txt-block" required placeholder="Phone number"/>
                            </div>
                            <div id="info-form" className="form-group display-none">
                                <label className="labelis" htmlFor="info">Additional info</label>
                                <textarea id="info" className="form-control txt-block" placeholder="Tell us a little bit about yourself!" name="info" rows="3"></textarea>
                            </div>
                            <div hidden><input id="test" required/></div> 
                            <button id="login" name="login-submit" signup="false" onClick={handleSubmit} className="centerHorizontally btn btn-primary">Login</button>
                        </form>
                        <span id="account">Don't have an account yet? <a id="signup">Signup</a></span>
                    </div>
                </main>
            </div>
        </React.Fragment>
    )
}

export default Form;