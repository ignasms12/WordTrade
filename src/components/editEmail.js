import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settingsPng from '../images/settings-gears.svg';
import malePng from '../images/male.png';
import useFormValidation from '../js/useFormValidation';
import validateAuth from "../js/validateAuth";
import firebase from '../js/firebase.js';




export default function EditEmail(props){

    const INITIAL_STATE = {
        email: "",
        emailRpt: "",
    }
    const { 
        handle,
        handleChange,
        handleBlur,
        values,
        errors,
        serverError,
        isSubmitting
    } = useFormValidation(INITIAL_STATE, validateAuth);

    const handleSubmit = async () => {
        if(values.email === values.emailRpt)
        {
            await firebase.changeEmail(values.email);
            window.location.reload();
        }
        else
            alert("Email entered must be the same in both fields.");
    }
    if(props.user)
    {
        return (
            <React.Fragment>
                <body>
                    <header>
                        {/* <!--Settings-->
                        <a href="./index3.html"><img className="back" src="./resources/imgs/back.jpg" alt="back"></a> */}
                        <h1 className="wordTrade2"> WordTrade</h1>
                    </header> 
                    <div className="spacer"></div>
                    <section className="wishList">
                        <label className="wishlistLabel">Change Email</label>
                        <div className="myprofile">
                            <div className="imgcontainer">
                                <img className="profilePhoto" src={malePng}/>
                            </div>
                            <div className="nickname">{props.user.displayName}</div>
                            <div className = "inputcontainer field">
                                <input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter an email address" name="email"/>
                            </div>
                            <div className = "inputcontainer field">
                                <input type="emailRpt" value={values.emailRpt} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm the email address" name="emailRpt"/>
                            </div>
                            <div className="submitChanges">
                                <input className="submit" type="submit" onClick={handleSubmit} name="Submit"/>
                            </div>
                        </div>
                    
                    </section>
                    <footer>
                        <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist}/><span>WishList</span></div></Link>
                        <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg}/><span>OwnedList</span></div></Link>
                        <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake}/><span>Deals</span></div></Link>
                        <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat}/><span>Messaging</span></div></Link>
                        <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settingsPng}/><span>Settings</span></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        )
    }
    else
        return(<Redirect to='/' />);

}
