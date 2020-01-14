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
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          books: [],
        };
    }
    async componentDidMount(){ 
        firebase.auth.onAuthStateChanged(async(user) => { //Sito reikia, kad spetu initializuotis..
          if(user){
            const ownedlist = await firebase.getOwnedlist();
            this.setState({
              isLoaded: true,
              books: ownedlist,
              observer: firebase.getUserDoc().onSnapshot(async(snapshot) => {
                const ownedlist = await firebase.getOwnedlist();
                  this.setState({
                      books: ownedlist, 
                  });
                  var domUL = document.getElementById("dropDownList");
                  var domInput = document.getElementById("addOwnedlist");
                  if(domUL && domInput){
                    domUL.classList.remove("dropDown");
                    domInput.classList.remove("borderUpdate");
                    domUL.innerHTML = "";
                  }
              }, err => {console.log("Encountered error", err)}),
            });
        }
    });
  }
    render() {
        const { error, isLoaded, books } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <body>
                        <header>
                            <h1 className="wordTrade">WordTrade</h1>
                        </header>
                        <section className="Add Item">
                            <div className="addContainer">
                                <img src={add} alt=""/>
                            </div>
                            <input className="addItem" id="addOwnedlist" type="text" placeholder="Add Item" />
                            <ul id="dropDownList"></ul>
                        </section>
                        <div className="spacer"></div>
                        <section className="wishList">
                            <label className="wishlistLabel">Your books</label>
                            {books.map(item => (
                            <Link to={"bookdetails?id="+item.id}>
                                <div className="listItem">
                                <p>{item.volumeInfo.authors} {item.volumeInfo.title}</p>
                                </div>
                            </Link>
                            ))}
                        </section>
                        <footer>
                            <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist} alt=""/><span>WishList</span></div></Link>
                            <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg} alt=""/><span>OwnedList</span></div></Link>
                            <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake} alt=""/><span>Deals</span></div></Link>
                            <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat} alt=""/><span>Messaging</span></div></Link>
                            <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settings} alt=""/><span>Settings</span></div></Link>
                        </footer>
                    </body>
                </React.Fragment>
            )
        }
    }
}
