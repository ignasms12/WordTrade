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

export default class ownedlist extends Component {
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
