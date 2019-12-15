import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import '../js/dropDownApi.js';
import add from '../images/ad.svg';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';


export default class wishlist extends Component {
  componentDidMount(){ 
    document.getElementById("wishlist").classList.add("selected");
    document.getElementById("ownedlist").classList.remove("selected");
    document.getElementById("deals").classList.remove("selected");
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
              <img src={add}/>
            </div>
            <input id="addWishlist" className="addItem" type="text" placeholder="Add Item" />
            <ul id="dropDownList"></ul>
          </section>
          <div className="spacer"></div>
          <section className="wishList">
            <label className="wishlistLabel">WishList</label>
            <Link to = "/bookdetails?id=">
              <div className="listItem">
                <p>Elton John "Me"</p>
              </div>
            </Link>
            <Link to = "/bookdetails?id=hHGHDgAAQBAJ">
              <div className="listItem">
                <p>Adam Kay "This is Going to hurt"</p>
              </div>
            </Link>
            <Link to = "/bookdetails?id=4dGQDwAAQBAJ">
              <div className="listItem">
                <p>Andre Aciman "Find Me"</p>
              </div>
            </Link>
            <Link to = "/bookdetails?id=">
              <div className="listItem">
                <p>Heather Morris "Cilka's Journey"</p>
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
