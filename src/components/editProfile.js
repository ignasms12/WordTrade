import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settingsPng from '../images/settings-gears.svg';
import malePng from '../images/male.png';


export default class editProfile extends Component {
    render() {
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
                                <img className="profilePhoto" src={malePng}/>
                            </div>
                            <div className="nickname">Username here</div>

                            <div className="uploadPhoto">
                                <input  className="choosePhoto" type="file" id="file" accept="image/*" />
                                <label fors="file">Upload Picture</label>
                            </div>

                            <div class = "inputcontainer field">
                                <input type="text" placeholder="Country" name=""/>
                            </div>
                            <div class = "inputcontainer field">
                                <input type="text" placeholder="Full name" name=""/>
                            </div>
                            <div class = "inputcontainer field">
                                <input type="text" placeholder="Username" name=""/>
                            </div>
                        </div>
                        <div className="submitChanges">
                            <input  className="submit" type="submit" name="Submit"/>
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
}
