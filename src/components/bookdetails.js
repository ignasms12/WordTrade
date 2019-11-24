import React, { Component } from 'react'
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import BookImage from '../images/goldfinch.jpg';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
var Description = "Aged thirteen, Theo Decker, son of a devoted mother and a reckless, largely absent father, survives an accident that otherwise tears his life apart. Alone and rudderless in New York, he is taken in by the family of a wealthy friend. He is tormented by an unbearable longing for his mother, and down the years clings to the thing that most reminds him of her: a small, strangely captivating painting that ultimately draws him into the criminal underworld. As he grows up, Theo learns to glide between the drawing rooms of the rich and the dusty antiques store where he works. He is alienated and in love - and his talisman, the painting, places him at the centre of a narrowing, ever more dangerous circle. The Goldfinch is a haunted odyssey through present-day America and a drama of enthralling power. Combining unforgettably vivid characters and thrilling suspense, it is a beautiful, addictive triumph - a sweeping story of loss and obsession, of survival and self-invention, of the deepest mysteries of love, identity and fate.";
// TODO padaryt kad per urla gal paimtu some kind of book code
// ir pagal tai is db pasiimtu pavadinima ir tada butu iskarto import {name} ir componentas done
// Question. Kodel nera knygos pavadinimo? Spraga ux'e?
export default class bookdetails extends Component {
    render() {
        return (
            <React.Fragment>
                <body>
                    <header>
                        {/* <a href="./index2.html"><img class="back" src="./resources/imgs/back.jpg" alt="back"></a> */}
                        <h1 class="wordTrade2">WordTrade</h1>
                    </header>
                    <div class="spacer"></div>
                    <section class="wishList">
                        <label class="wishlistLabel">Book details</label>
                        <div class="photo">
                            <img class="book" src={BookImage} alt=""/>
                        </div>
                        <div class="add">
                                <button>Add to wishlist</button>
                                <button>Write to a seller</button>
                        </div>             
                        <div class="aboutBook"> 
                            <h3>Description</h3>
                            <p>
                                {Description}
                            </p>   
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
            </React.Fragment>
        )
    }
}
