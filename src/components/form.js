import React, { Component } from 'react';
import './../stylesheets/style.css';
import './../stylesheets/bootstrap.css';
import './../fonts/fonts.css';
import loginVideo from './../images/login.mp4';
import './../js/loginLogic';

export default class form extends Component {
    constructor(props) {
        super(props);
        //this.state = {user: '', psw: ''};
      }

    handleSubmit = (e) => {
        //console.log('A name was submitted: ' + this.state.user + this.state.psw);
        e.preventDefault();
    }
    render() {
        return (
            // <form onSubmit={this.handleSubmit}>
            //     <label>Username: </label><br/>
            //     <input 
            //         type="text"
            //         value={this.props.creds.username}
            //         onChange={this.props.handleChangeUser} 
            //     /><br/>
            //     <label>Password: </label><br/>
            //     <input 
            //         type="password" 
            //         name="psw"
            //         value={this.props.creds.password}
            //         onChange={this.props.handleChangePsw}>
            //     </input><br/>
            //     {console.log(this.props.creds)}
            //     <button type="submit">Submit</button>
            // </form>
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
                                    <input type="email" className="form-control initial-forms" name="mail" id="email"
                                    aria-describedby="emailHelp" placeholder="Enter email" required/>
                                </div>
                                <div className="form-group right">
                                    <label className="labelis" htmlFor="passwordInput">Password</label>
                                    <input id="psw-first" type="password" name="pwd" className="form-control initial-forms"
                                    placeholder="Password" required/>
                                </div>
                                <div id="name-form" className="form-group display-none left">
                                    <label className="labelis" htmlFor="name">Name</label>
                                    <input id="name" type="text" name="name" className="form-control txt-block" placeholder="Your name" required="@"/>
                                </div>
                                <div id="psw-repeat-form" className="form-group display-none right">
                                    <label className="labelis" htmlFor="password">Repeat</label>
                                    <input id="psw-repeat" type="password" name="pwd-repeat" className="form-control txt-block" placeholder="Repeat password" required/>
                                </div>
                                <div id="age-form" className="form-group display-none left">
                                    <label className="labelis" htmlFor="age">Age</label>
                                    <input id="age" type="text" name="age" className="form-control txt-block" placeholder="Age" required/>
                                </div>
                                <div id="car-model-form" className="form-group display-none right">
                                    <label className="labelis" htmlFor="model">Number</label>
                                    <input id="telefono-nr" type="text" name="tlf" className="form-control txt-block" required placeholder="Phone number"/>
                                </div>
                                <div id="info-form" className="form-group display-none">
                                    <label className="labelis" htmlFor="info">Additional info</label>
                                    <textarea id="info" className="form-control txt-block" placeholder="Tell us a little bit about yourself!" name="info" rows="3"></textarea>
                                </div>
                                <button id="login" name="login-submit" className="centerHorizontally btn btn-primary">Login</button>
                            </form>
                            <span id="account">Don't have an account yet? <a id="signup">Signup</a></span>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        )
    }
}
