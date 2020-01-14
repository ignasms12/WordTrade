import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../stylesheets/main.css";
import "../fonts/fonts.css";
import whitelist from "../images/whitelist.png";
import wishlistImg from "../images/wishlist.svg";
import handshake from "../images/handshake.png";
import whitechat from "../images/whitechat.png";
import settingsPng from "../images/settings-gears.svg";
import malePng from "../images/male.png";
import firebase from "../js/firebase.js";

export default class editPassword extends Component {
  handleSubmit = () => {
    if (this.props.user) firebase.resetPassword();
  };
  render() {
    if (this.props.user) {
      return (
        <React.Fragment>
          <body>
            <header>
              {/* <!--Settings-->
                    <a href="./index3.html"><img className="back" src="./resources/imgs/back.jpg" alt="back"></a> */}
              <h1 className="wordTrade2"> WordTrade</h1>
            </header>

            <div className="spacer"></div>
            <section className="wishList">
              <label className="wishlistLabel">Change Password</label>

              <div className="myprofile">
                <div class="imgcontainer">
                  <img className="profilePhoto" src={malePng} alt=""/>
                </div>
                <div className="nickname">{this.props.user.displayName}</div>

                <button
                  id="sendPswReset"
                  name="sendPswReset"
                  onClick={this.handleSubmit}
                  className="centerHorizontally btn btn-primary"
                >
                  Send Password Reset
                </button>
              </div>
            </section>
            <footer>
              <Link to="/wishlist">
                <div id="wishlist" className="navbar-element">
                  <img src={whitelist} alt=""/>
                  <span>WishList</span>
                </div>
              </Link>
              <Link to="/ownedlist">
                <div id="ownedlist" className="navbar-element">
                  <img src={wishlistImg} alt=""/>
                  <span>OwnedList</span>
                </div>
              </Link>
              <Link to="/deals">
                <div id="deals" className="navbar-element">
                  <img src={handshake} alt=""/>
                  <span>Deals</span>
                </div>
              </Link>
              <Link to="/messaging">
                <div id="messaging" className="navbar-element">
                  <img src={whitechat} alt=""/>
                  <span>Messaging</span>
                </div>
              </Link>
              <Link to="/settings">
                <div id="settings" className="navbar-element">
                  <img src={settingsPng} alt=""/>
                  <span>Settings</span>
                </div>
              </Link>
            </footer>
          </body>
        </React.Fragment>
      );
    }
    else
        return(<Redirect to='/' />);
  }
}
