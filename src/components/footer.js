import React, { Component } from 'react';
import whitelist from '../images/whitelist.png';
import wishlist from '../images/wishlist.svg';
import handshake from '../images/wishlist.svg';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';

export default class footer extends Component {
    render() {
        return (
            <React.Component>
                <footer>
                    <div className="foot"><img src={whitelist}/></div>
                    <div className="foot"><img src={wishlist}/></div>
                    <div className="foot"><img src={handshake}/></div>
                    <div className="foot"><img src={whitechat}/></div>
                    <div className="foot"><img src={settings}/></div>
                </footer>
            </React.Component>
        )
    }
}
