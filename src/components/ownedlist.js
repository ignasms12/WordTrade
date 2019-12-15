import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import add from '../images/ad.svg';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import firebase from '../js/firebase.js';

export default class ownedlist extends Component {
    componentDidMount(){ 
        document.getElementById("wishlist").classList.remove("selected");
        document.getElementById("ownedlist").classList.add("selected");
        document.getElementById("deals").classList.remove("selected");
        document.getElementById("messaging").classList.remove("selected");
        document.getElementById("settings").classList.remove("selected");
        firebase.auth.onAuthStateChanged(async(user) => { //Sito reikia, kad spetu initializuotis..
            if(user)
            {
              const wishList = await firebase.getOwnedlist();
              console.log("Owned book object array: ", wishList);
              wishList.forEach(book => {
                  console.log(book);
              }); 
            }
          });
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
                        <input className="addItem" id="addOwnedlist" type="text" placeholder="Add Item" />
                        <ul id="dropDownList"></ul>
                    </section>
                    <div className="spacer"></div>
                    <section className="wishList">
                        <label className="wishlistLabel">Your books</label>
                        <Link to = "/bookdetails">
                            <div className="listItem">
                                <p>Doris Lessing "The Golden Notebook"</p>
                            </div>
                        </Link>
                        <Link to = "/bookdetails">
                            <div className="listItem">
                                <p>Donna Tartt "The Goldfinch"</p>
                            </div>
                        </Link>
                        <Link to = "/bookdetails">
                            <div className="listItem">
                                <p>Charlotte Bronte "Jane Eyre"</p>
                            </div>
                        </Link>
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
