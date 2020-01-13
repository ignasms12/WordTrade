import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './messaging-components/MessageList';
import SendMessageForm from './messaging-components/SendMessageForm';
import RoomList from './messaging-components/RoomList';
import NewRoomForm from './messaging-components/NewRoomForm';
import { Link } from 'react-router-dom';
import whitelist from '../images/whitelist.png';
import wishlistImg from '../images/wishlist.svg';
import handshake from '../images/handshake.png';
import whitechat from '../images/whitechat.png';
import settings from '../images/settings-gears.svg';
import firebase from '../js/firebase.js';

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
    
    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
    } 
    
    componentDidMount() {
        var uid;
        firebase.auth.onAuthStateChanged(async(user) => {
            if(user){
                uid = user.uid;
            };

            let data = "stringeroo";

            // fetch("http://localhost:4000/postreq", {
            // method: "POST", 
            // body: JSON.stringify(data)
            // }).then(res => {
            // console.log("Request complete! response:", res);
            // });

            var req = new XMLHttpRequest();
            req.open("POST", "http://localhost:4000/postreq", true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify({datas: "stringeruo"}))

            const chatManager = new Chatkit.ChatManager({
                instanceLocator : instanceLocator,
                userId: uid,
                tokenProvider: new Chatkit.TokenProvider({
                    url: tokenUrl
                })
            })
            
            chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser
                this.getRooms()
            })
            .catch(err => console.log('error on connecting: ', err))
        });
    }
    
    getRooms() {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
            // console.log(this.currentUser.rooms[0].id);
            // this.subscribeToRoom(this.currentUser.rooms[0].id);
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }
    
    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
                
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        })
        .catch(err => console.log('error on subscribing to room: ', err))
    }
    
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }
    
    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
        .then(room => {
            this.subscribeToRoom(room.id)
        })
        .catch(err => console.log('error with createRoom: ', err))
    }
    
    render() {
        return (
            <React.Fragment>
                <body>
                    <RoomList
                        subscribeToRoom={this.subscribeToRoom}
                        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                        roomId={this.state.roomId} />
                    <MessageList 
                        roomId={this.state.roomId}
                        messages={this.state.messages} />
                    <SendMessageForm
                        disabled={!this.state.roomId}
                        sendMessage={this.sendMessage} />
                    {/* <NewRoomForm createRoom={this.createRoom} /> */}
                    <footer>
                        <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist}/><span>WishList</span></div></Link>
                        <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg}/><span>OwnedList</span></div></Link>
                        <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake}/><span>Deals</span></div></Link>
                        <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat}/><span>Messaging</span></div></Link>
                        <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settings}/><span>Settings</span></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        );
    }
}

export default App