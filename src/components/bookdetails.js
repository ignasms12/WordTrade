import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../js/firebase.js';
import '../stylesheets/main.css';
import '../fonts/fonts.css';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import noImg from '../images/noImg.svg';
import loading from '../images/loading.gif';
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
                    book: result.items[0],
                })
                if(this.state.book.hasOwnProperty('volumeInfo') && this.state.book)
                {
                    if(this.state.book.volumeInfo.hasOwnProperty('imageLinks')){
                        this.setState({
                            bookThumbnail: this.state.book.volumeInfo.imageLinks.thumbnail,
                        })
                    }
                }
                console.log(result)
            }
        )
    }
    handleClick = async () =>{
        await firebase.addToWishlist(this.state.book);
        alert("Book added to wishlist!");
    }
    render() {
        const { error, isLoaded, book } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <React.Fragment>
                    <body>
                        <div className="loadingContainer">
                            <img src={loading} alt=""/>
                        </div>
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
            var description = "No description available for this book."
            if(book.volumeInfo.description){
                description = book.volumeInfo.description;
            }
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
                            <div className="bookdetailsContainer">
                                <h1 className="bookTitle">{book.volumeInfo.title}</h1>
                                <p className="authors">by {book.volumeInfo.authors}</p>           
                                <div className="aboutBook"> 
                                    <h3>Description</h3>
                                    <p>
                                        {description}
                                    </p>   
                                </div>
                            </div>
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
