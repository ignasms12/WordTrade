import React from 'react';
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
import validateEdit from "../js/validateEdit";
import firebase from '../js/firebase.js';


export default function EditProfile(props){

    const INITIAL_STATE = {
        country: "",
        name: "",
    }
    const { 
        //handle,
        handleChange,
        handleBlur,
        values,
        errors,
        //serverError,
        //isSubmitting
    } = useFormValidation(INITIAL_STATE, validateEdit);

    const handleSubmit = async () => {
        if(!errors.name && !errors.country)
        {
            await firebase.editProfile(values.name, values.country);
        }
        else
            alert("Name or Country Code formatting is incorrect.");
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
                        <label className="wishlistLabel">Edit Profile</label>

                        <div className="myprofile">
                            <div class="imgcontainer">
                                <img className="profilePhoto" src={malePng} alt=""/>
                            </div>
                            <div className="nickname">{props.user.displayName}</div>

                            <div className="uploadPhoto">
                                <input  className="choosePhoto" type="file" id="file" accept="image/*" />
                                <label fors="file">Upload Picture</label>
                            </div>

                            <div class = "inputcontainer field">
                                <input type="text" value={values.country} onChange={handleChange} onBlur={handleBlur} placeholder="Country Code" name="country"/>
                            </div>
                            <div class = "inputcontainer field">
                                <input type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Full name" name="name"/>
                            </div>
                        </div>
                        <div className="submitChanges">
                            <input className="submit" type="submit" onClick={handleSubmit} name="Submit"/>
                        </div>
                </section>
                <footer>
                    <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist} alt=""/><span>WishList</span></div></Link>
                    <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg} alt=""/><span>OwnedList</span></div></Link>
                    <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake} alt=""/><span>Deals</span></div></Link>
                    <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat} alt=""/><span>Messaging</span></div></Link>
                    <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settingsPng} alt=""/><span>Settings</span></div></Link>
                </footer>
                </body>
            </React.Fragment>
        )
    }
    else
        return(<Redirect to='/' />);
    
}
