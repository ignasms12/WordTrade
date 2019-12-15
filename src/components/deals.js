import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import add from '../images/ad.svg';
export default class deals extends Component {
    componentDidMount(){ 
        document.getElementById("wishlist").classList.remove("selected");
        document.getElementById("ownedlist").classList.remove("selected");
        document.getElementById("deals").classList.add("selected");
        document.getElementById("messaging").classList.remove("selected");
        document.getElementById("settings").classList.remove("selected");
    }
    render() {
        return (
            <React.Fragment>
                <body>
                    <header>                    
                        <h1 className="wordTrade">WordTrade</h1>
                    </header>

                    <section className="Add Item">
                        <div className="addContainer">
                            <img src={add} />
                        </div>
                        <input className="Search" type="text" placeholder="Search" />
                    </section>

                    <div className="spacer"></div>
                    <section className="wishList">
                        <label className="wishlistLabel">Deals</label>

                        <div className="suggestion">
                                <div className="boxFriend"></div>
                                <p>
                                    <div className="user">John</div> has <div className="book2">Elton John "Me"</div> and wants to trade
                                    <div className="book3">Charlotte Bronte "Jane Eyre".</div>
                                </p>
                                <div className="makeaDeal">
                                    <button>Make a deal</button>
                                </div>
                        </div>
                    
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
