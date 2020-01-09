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
        return <div>Loading...</div>;
        } else if (!isLoaded) {
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
                            <h1 className="noDeals">Sorry, we couldn't find any deals for you at the moment. :(</h1>
                        
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
                            {console.log("Pries pat", dealsai)}
                            {console.log("Pries pat lengh", dealsai.length)}
                            {dealsai.map(deal => (
                            <div className="suggestion">
                                <div className="boxFriend"></div>
                                <p>
                                    <div className="user">{deal.userID}</div> has <div className="book2">Elton John "Me"</div> and wants to trade
                                    <div className="book3">Charlotte Bronte "Jane Eyre".</div>
                                </p>
                                <div className="makeaDeal">
                                    <button>Make a deal</button>
                                </div>
                            </div>
                            ))}
                        
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
}