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
                        <Link to = "/wishlist"><div className="foot"><img src={whitelist}/></div></Link>
                        <Link to = "/ownedlist"><div className="foot"><img src={wishlistImg}/></div></Link>
                        <Link to = "/deals"><div className="foot"><img src={handshake}/></div></Link>
                        <Link to = "/messaging"><div className="foot"><img src={whitechat}/></div></Link>
                        <Link to = "/settings"><div className="foot"><img src={settings}/></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        )
    }
}
