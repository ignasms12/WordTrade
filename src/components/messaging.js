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

var otherUserID, uid;
var alreadySubscribed = false;

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
        alreadySubscribed = false;
        var uDisplayName;
        firebase.auth.onAuthStateChanged(async(user) => {
            if(user){
                uid = user.uid;
                uDisplayName = user.displayName.split(" ");
            };

            const chatManager = new Chatkit.ChatManager({
                instanceLocator : instanceLocator,
                userId: uid,
                tokenProvider: new Chatkit.TokenProvider({
                    url: tokenUrl
                })
            })
            
            chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.getRooms();
                var userIdQuery = window.location.search;
                if(userIdQuery){
                    otherUserID = userIdQuery.substring(5, 33);
                    var otherDisplayName = userIdQuery.substring(37).split("%20");
                    // kito : otherUserID, otherDisplayName
                    // mano : uid, uDisplayName

                    this.createRoom(uDisplayName[0] + " and " + otherDisplayName[0]);
                }
            })
            .catch(err => console.log('error on connecting: ', err))
        });
    }
    
    getRooms() {
        // console.log("Subd rooms");
        // console.log(this.currentUser.roomSubscriptions);
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
        if(!alreadySubscribed){
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
                this.getRooms();
                if(window.location.search){
                    this.addOtherPersonToRoom(roomId);
                }
            })
            .catch(err => console.log('error on subscribing to room: ', err))
        }
    }
    
    sendMessage(text) {
        if(this.currentUser.id == uid){
            this.currentUser.sendMessage({
                text,
                roomId: this.state.roomId
            })
        } else {

            const chatManager = new Chatkit.ChatManager({
                instanceLocator : instanceLocator,
                userId: uid,
                tokenProvider: new Chatkit.TokenProvider({
                    url: tokenUrl
                })
            })

            chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.sendMessage(text);
            })
            .catch(err => console.log('error on relogging: ', err))
        }
    }
    
    createRoom(name) {
        var roomAlreadyExists = false;
        for(var i = 0; i < this.currentUser.rooms.length; i++){
            var currentRoomUsers = this.currentUser.rooms[i].id.split(" and ");
            var newRoomUsers = name.split(" and ");
            if(((currentRoomUsers[0] == newRoomUsers[0]) && (currentRoomUsers[1] == newRoomUsers[1]))
            || ((currentRoomUsers[0] == newRoomUsers[1]) && (currentRoomUsers[1] == newRoomUsers[0]))
            ){
                roomAlreadyExists = true;
            }
        }
        if(!roomAlreadyExists){
            this.currentUser.createRoom({
                id: name,
                name,
                private: true,
                addUserIds: [otherUserID]
            })
            .then(room => {
                this.subscribeToRoom(room.id);
            })
            .catch(err => console.log('error with createRoom: ', err));
        }
        
    }

    addOtherPersonToRoom(roomId) {

        const chatManager2 = new Chatkit.ChatManager({
            instanceLocator : instanceLocator,
            userId: otherUserID,
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        alreadySubscribed = true;
        // chatManager2.connect()
        // .then(otherUser => {
        //     this.currentUser = otherUser;
        //     console.log("this is other user");
        //     console.log(otherUser);
        //     this.currentUser.subscribeToRoomMultipart({
        //         roomId: roomId
        //     })
        //     alreadySubscribed = true;
        // })
        // .catch(err => console.log('error on connecting: ', err))
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
                        messages={this.state.messages}
                        userId={uid} />
                    <SendMessageForm
                        disabled={!this.state.roomId}
                        sendMessage={this.sendMessage} />
                    {/* <NewRoomForm createRoom={this.createRoom} /> */}
                    <footer>
                        <Link to = "/wishlist"><div id="wishlist" className="navbar-element"><img src={whitelist} alt=""/><span>WishList</span></div></Link>
                        <Link to = "/ownedlist"><div id="ownedlist" className="navbar-element"><img src={wishlistImg} alt=""/><span>OwnedList</span></div></Link>
                        <Link to = "/deals"><div id="deals" className="navbar-element"><img src={handshake} alt=""/><span>Deals</span></div></Link>
                        <Link to = "/messaging"><div id="messaging" className="navbar-element"><img src={whitechat} alt=""/><span>Messaging</span></div></Link>
                        <Link to = "/settings"><div id="settings" className="navbar-element"><img src={settings} alt=""/><span>Settings</span></div></Link>
                    </footer>
                </body>
            </React.Fragment>
        );
    }
}

export default App