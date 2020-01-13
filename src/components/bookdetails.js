import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import BookImage from '../images/goldfinch.jpg';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import noImg from '../images/noImg.svg';
//var Description = "Aged thirteen, Theo Decker, son of a devoted mother and a reckless, largely absent father, survives an accident that otherwise tears his life apart. Alone and rudderless in New York, he is taken in by the family of a wealthy friend. He is tormented by an unbearable longing for his mother, and down the years clings to the thing that most reminds him of her: a small, strangely captivating painting that ultimately draws him into the criminal underworld. As he grows up, Theo learns to glide between the drawing rooms of the rich and the dusty antiques store where he works. He is alienated and in love - and his talisman, the painting, places him at the centre of a narrowing, ever more dangerous circle. The Goldfinch is a haunted odyssey through present-day America and a drama of enthralling power. Combining unforgettably vivid characters and thrilling suspense, it is a beautiful, addictive triumph - a sweeping story of loss and obsession, of survival and self-invention, of the deepest mysteries of love, identity and fate.";
// TODO padaryt kad per urla gal paimtu some kind of book code
// ir pagal tai is db pasiimtu pavadinima ir tada butu iskarto import {name} ir componentas done
// Question. Kodel nera knygos pavadinimo? Spraga ux'e?
export default class bookdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            book: [],
            bookThumbnail: noImg,
        };
    }
    componentDidMount(){       
        this.makeRemoteRequest();
    }
    async makeRemoteRequest() {
        try{
            var query = window.location.search;
            var bookID = query.substring(4);
            await this.apiCall(bookID);
        } catch(e) {
            console.log(e);
        }
    }
    apiCall(id) {
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + id)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    book: result.items[0].volumeInfo
                })
                if(typeof(this.state.book.imageLinks) !== "undefined")
                {
                    this.setState({
                        bookThumbnail: this.state.book.imageLinks.thumbnail,
                    })
                }
                console.log(result)
            }
        )
    }
    render() {
        const { error, isLoaded, book } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <body>
                        <header>
                            {/* <a href="./index2.html"><img className="back" src="./resources/imgs/back.jpg" alt="back"></a> */}
                            <h1 className="wordTrade2">WordTrade</h1>
                        </header>
                        <div className="spacer"></div>
                        <section className="wishList">
                            <label className="wishlistLabel">Book details</label>
                            <div className="photo">
                                <img className="book" src={this.state.bookThumbnail} alt=""/>
                            </div>
                            <div className="add">
                                    <button>Add to wishlist</button>
                                    <button>Write to a seller</button>
                            </div>
                            <h1 className="bookTitle">{book.title}</h1>
                            <p className="authors">by {book.authors}</p>           
                            <div className="aboutBook"> 
                                <h3>Description</h3>
                                <p>
                                    {book.description}
                                </p>   
                            </div>
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
