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
                        <Link to = "/wishlist"><div className="foot"><img src={whitelist}/></div></Link>
                        <Link to = "/ownedlist"><div className="foot"><img src={wishlistImg}/></div></Link>
                        <Link to = "/deals"><div className="foot"><img src={handshake}/></div></Link>
                        <Link to = "/messaging"><div className="foot"><img src={whitechat}/></div></Link>
                        <Link to = "/settings"><div className="foot"><img src={settingsPng}/></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        )
    }
}
