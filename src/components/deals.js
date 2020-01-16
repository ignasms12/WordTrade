import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import loading from '../images/loading.gif';
import firebase from '../js/firebase.js';

export default class deals extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          dealsai: []
        };
    }
    async componentDidMount(){
        firebase.auth.onAuthStateChanged(async(user) => { //Sito reikia, kad spetu initializuotis..
          if(user){
            await firebase.updateMatches();
            let matches = await firebase.getDeals();
            this.setState({
              isLoaded: true,
              dealsai: matches
            });
        }
    });
  }
    render() {
        const { error, isLoaded, dealsai } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return(
                <React.Fragment>
                    <body>
                        <div className="loadingContainer">
                            <img src={loading} alt=""/>
                        </div>
                    </body>
                    <footer>
                        <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist} alt=""/><span>WishList</span></div></Link>
                        <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg} alt=""/><span>OwnedList</span></div></Link>
                        <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake} alt=""/><span>Deals</span></div></Link>
                        <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat} alt=""/><span>Messaging</span></div></Link>
                        <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settings} alt=""/><span>Settings</span></div></Link>
                    </footer>
                </React.Fragment>
            )
        } else if (!dealsai.length) {
            console.log("Deals are(not)", dealsai)
            return (
                <React.Fragment>
                    <body>
                        <header>                    
                            <h1 className="wordTrade">WordTrade</h1>
                        </header>
                        <div className="spacer"></div>
                        <section className="wishList">
                            <label className="wishlistLabel">Deals</label>
                            <h1 className="noDeals">
                                <span class="sorry">Sorry,</span>
                                 we couldn't find any deals for you at the moment. :(
                            </h1>
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
        } else {
            console.log("Deals are",dealsai);
            return (
                <React.Fragment>
                    <body>
                        <header>                    
                            <h1 className="wordTrade">WordTrade</h1>
                        </header>
                        {/* <section className="Add Item">
                            <div className="addContainer">
                                <img src={add} />
                            </div>
                            <input className="Search" type="text" placeholder="Search" />
                        </section> */}
                        <div className="spacer"></div>
                        <section className="wishList">
                            <label className="wishlistLabel">Deals</label>
                            {dealsai.map(deal => (
                            <div className="suggestion">
                                <div className="boxFriend"></div>
                                <p>
                                    <div id="dealUser" className="user" uid={deal.uid}>{deal.userName}</div> has <div className="book2">{deal.hisBook.volumeInfo.title}</div> and wants to trade <div className="book3">{deal.yourBook.volumeInfo.title}</div>
                                </p>
                                <div className="makeaDeal">
                                    <Link to = {"messaging?uid=" + deal.userID + "&dn=" + deal.userName}><button>Make a Deal</button></Link>
                                </div>
                            </div>
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