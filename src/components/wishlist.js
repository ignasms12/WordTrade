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
import minus from '../images/minus.svg';
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
              });
              var domUL = document.getElementById("dropDownList");
              var domInput = document.getElementById("addWishlist");
              if(domUL && domInput){
                domUL.classList.remove("dropDown");
                domInput.classList.remove("borderUpdate");
                domUL.innerHTML = "";
              }
          }, err => {console.log("Encountered error", err)}),
        });
        var minuses = document.getElementsByClassName("minusContainer");
        if(minuses){
          for (var minus in minuses) {
            try {
              minuses[minus].onclick = function() {
                firebase.removeFromWishlist(this.getAttribute("bookId"));
              }
            } catch (error) {
              console.log("Error on adding event handlers", error);
            }
          }
        }
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
                <img src={add} alt=""/>
              </div>
              <input id="addWishlist" className="addItem" type="text" placeholder="Add Item" />
              <ul id="dropDownList"></ul>
            </section>
            <div className="spacer"></div>
            <section className="wishList">
              <label className="wishlistLabel">WishList</label>
              {books.map(item => (
                <div className="listItem">
                  <Link to={"bookdetails?id="+item.id}>
                    <p>{item.volumeInfo.authors} {item.volumeInfo.title}</p>
                  </Link>
                  <div bookId={item.id} className="minusContainer">
                    <img src={minus}/>
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
