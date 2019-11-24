import React, { Component } from 'react'
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
            <div>
                <body>
                    <header>
                        <h1 className="wordTrade">WordTrade</h1>
                    </header>
                    <section className="Add Item">
                        <div className="addContainer">
                            <img src={add} />
                        </div>
                        <input className="addItem" type="text" placeholder="Add Item" />
                    </section>
                    <div className="spacer"></div>
                    <section className="wishList">
                        <label className="wishlistLabel">Your books</label>
                        <div className="listItem">
                            <p>Doris Lessing "The Golden Notebook"</p>
                        </div>
                        <div className="listItem">
                            <p>Donna Tartt "The Goldfinch"</p>
                        </div>
                        <div className="listItem">
                            <p>Charlotte Bronte "Jane Eyre"</p>
                        </div>
                    </section>
                    <footer>
                        <div className="foot"><img src={whitelist}/></div>
                        <div className="foot"><img src={wishlistImg}/></div>
                        <div className="foot"><img src={handshake}/></div>
                        <div className="foot"><img src={whitechat}/></div>
                        <div className="foot"><img src={settings}/></div>
                    </footer>
                </body>
            </div>
        )
    }
}
