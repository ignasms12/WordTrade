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
import firebase from '../js/firebase.js';


export default class wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
  }

  async componentDidMount(){ 
    firebase.auth.onAuthStateChanged(async(user) => { //Sito reikia, kad spetu initializuotis..
      if(user){
        const wishList = await firebase.getWishlist();
        this.setState({
          isLoaded: true,
          books: wishList,
          observer: firebase.getUserDoc().onSnapshot(async(snapshot) => {
            const wishList = await firebase.getWishlist();
              this.setState({
                  books: wishList, 
              })
          }, err => {console.log("Encountered error", err)}),
        });
        // document.getElementById("wishlist").classList.add("selected");
        // document.getElementById("ownedlist").classList.remove("selected");
        // document.getElementById("deals").classList.remove("selected");
        // document.getElementById("messaging").classList.remove("selected");
        // document.getElementById("settings").classList.remove("selected");
        // console.log("Book object array: ");
        // wishList.forEach(book => {
        //     console.log(book);
        // });
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
      console.log(books);
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
              {books.map(item => (
              <Link to={"bookdetails?id="+item.id}>
                <div className="listItem">
                  <p>{item.volumeInfo.authors} {item.volumeInfo.title}</p>
                </div>
              </Link>
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
