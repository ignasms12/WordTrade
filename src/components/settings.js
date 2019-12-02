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

export default class settings extends Component {
    render() {
        return (
            <React.Fragment>
                <body>
                    <header>
                    {/* <!--Settings--> */}
                    {/* <a href="./index3.html"><img className="back" src="./resources/imgs/back.jpg" alt="back"></a> */}
                        <h1 className="wordTrade2"> WordTrade</h1>
                    </header>
                    <div className="spacer"></div>
                    <section className="wishList">
                        <label className="wishlistLabel">Settings</label>
                        <div className="myprofile">
                            <img className="profilePhoto2" src={malePng}/>
                            <div className="nickname">Lorem Ipsum</div>
                            <Link to = "/editProfile">
                                <div className="profile">
                                    <button>Edit my profile</button>
                                </div>
                            </Link>
                            <Link to = "/editEmail">
                                <div className="mail">
                                    <button>Change email</button>
                                </div>
                            </Link>
                            <Link to = "/editPassword">
                                <div className="password">
                                    <button>Change password</button>
                                </div>
                            </Link>
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
