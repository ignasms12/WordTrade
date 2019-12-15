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


export default class editEmail extends Component {
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
                        <label className="wishlistLabel">Change Email</label>
                        <div className="myprofile">
                            <img className="profilePhoto2" src={malePng} alt=""/>
                            <div className="nickname">Lorem Ipsum </div>
                            <div>
                                <input  className="enter" type="text" placeholder="Enter an email address" name=""/>
                            </div>
                            <div >
                                <input className="confirm" type="text" placeholder="Confirm the email address" name=""/>
                            </div>
                            <div className="submitChanges2">
                                <input  className="submit" type="submit" name="Submit"/>
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
}
