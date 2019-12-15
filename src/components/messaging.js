import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';

export default class messaging extends Component {
    componentDidMount(){ 
        document.getElementById("wishlist").classList.remove("selected");
        document.getElementById("ownedlist").classList.remove("selected");
        document.getElementById("deals").classList.remove("selected");
        document.getElementById("messaging").classList.add("selected");
        document.getElementById("settings").classList.remove("selected");
    }
    render() {
        return (
            <React.Fragment>
                <body>
                    <header>
                        {/* <a href="./index3.html"><img class="back" src="./resources/imgs/back.png" alt="back"></a> */}
                        <h1 class="wordTrade2">WordTrade</h1>

                    </header>
                    <div class="spacer"></div>
                    <section class="wishList">
                        <label class="wishlistLabel">Lilly</label>

                        <div class="conversation">
                            <div class="boxFriend2"></div>
                            <h4 class="friend">Hey! I saw you have the book "Me" by Elton John. Maybe you want some book from my list?</h4>
                            <h4 class="you">Hi, Lilly! I'll check your list later!</h4>
                            <div class="boxFriend2"></div>
                            <h4 class="friend">Ok, let me know</h4>
                        </div>

                        <section class="message">
                            <form>
                                {/* <input class="typeMessage" type="text" placeholder="Type your message..." name=""> */}
                                {/* <input class="send" type="image" src="./resources/imgs/send2.png" name=""> */}
                            </form>
                        </section>
                    </section>
                    <footer>
                        <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist}/><span>WishList</span></div></Link>
                        <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg}/><span>OwnedList</span></div></Link>
                        <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake}/><span>Deals</span></div></Link>
                        <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat}/><span>Messaging</span></div></Link>
                        <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settings}/><span>Settings</span></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        )
    }
}
