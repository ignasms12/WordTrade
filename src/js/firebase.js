import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firestore";

const fbConfig = {
  apiKey: "AIzaSyDfuFqY7fCQiG2HM0_GW7-yS8wTjW0oaCo",
  authDomain: "wordtrade-3717a.firebaseapp.com",
  databaseURL: "https://wordtrade-3717a.firebaseio.com",
  projectId: "wordtrade-3717a",
  storageBucket: "wordtrade-3717a.appspot.com",
  messagingSenderId: "132568163936",
  appId: "1:132568163936:web:8a0555cd6f790f957c8505",
  measurementId: "G-Y4X99Y9MZY"
};

class Firebase {
  constructor() {
    app.initializeApp(fbConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getAuth() {
    return this.auth;
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password, country, number, age) {
    console.log(number, country);
    await this.auth.createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      return result.user.updateProfile({
        displayName: name,
      })
    })
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set({
        wishlist: {
          books: []
        },
        ownedlist: {
          books: []
        },
        info: {
          name: name,
          phoneNumber: number,
          country: country,
          age: age,
        }
      });
  }

  async changeEmail(email) {
    const auth = this.auth;
    await auth.currentUser
      .updateEmail(email)
      .then(function() {
        //Changed successfully.
        alert("Email changed.");
      })
      .catch(function(error) {
        console.log("Error happened...", error);
        if(error.code === "auth/requires-recent-login")
        {
          alert("You need to re-authenticate to perform this action!");
          auth.signOut();
        }
        else
          alert(error);
      });
  }

  async editProfile(name, country){
    const db = this.db, auth = this.auth;
    await this.auth.currentUser.updateProfile({
      displayName: name,
    }).then(function() {
      return db
      .collection("users")
      .doc(auth.currentUser.uid)
      .set({
        info: {
          name: name,
          country: country,
        }
      },
      { merge: true }
      );
    }).catch(function(error) {
      alert(error);
    });
  }
  

  async resetPassword() {
    if(this.auth.currentUser){
      await this.auth
      .sendPasswordResetEmail(this.auth.currentUser.email)
      .then(function() {
        //Email sent
        alert("Password reset sent to email.");
      })
      .catch(function(error) {
        console.log("Couldn't send pswd reset email");
      });
    }
  }

  async getWishlist(uid = this.auth.currentUser.uid) {
    let wishlist;
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(function(doc) {
        wishlist = doc.data().wishlist;
      })
      .catch(function(error) {
        console.log("Error getting wishList:", error);
      });
    if (wishlist) return wishlist.books;
  }

  async getOwnedlist(uid = this.auth.currentUser.uid) {
    let ownedlist;
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(function(doc) {
        ownedlist = doc.data().ownedlist;
      })
      .catch(function(error) {
        console.log("Error getting OwnedList:", error);
      });
    if (ownedlist) return ownedlist.books;
  }

  async getDeals(uid = this.auth.currentUser.uid) {
    let deals;
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(function(doc) {
        deals = doc.data().deals.matches;
      })
      .catch(function(error) {
        console.log("Error getting deals:", error);
      });
    if (deals) return deals;
  }

  async getUsers() {
    const snapshot = await this.db.collection("users").get();
    const documents = [];
    snapshot.forEach(doc => documents.push(doc.id));

    return documents;
  }

  // getUsername() {
  //   if (this.auth.currentUser) return this.auth.currentUser.displayName;
  //   else return null;
  // }

  async getUsername(userID) {
    const users = await this.getUsers();
    let user = users.filter(user => user === userID); //If we have user in DB ..
    if(user.length !== 0)
      user = user[0];
    if(user)
    {
      let name;
      await this.db
      .collection("users")
      .doc(user)
      .get()
      .then(function(doc) {
        name = doc.data().info.name;
      })
      .catch(function(error) {
        console.log("Error getting wishList:", error);
      });

      return name;
    }
    return null;
  }

  getUserDoc() {
    return this.db.collection("users").doc(this.auth.currentUser.uid);
  }

  async removeFromWishlist(bookID) {
    let wishlist = await this.getWishlist();
    wishlist = wishlist.filter(book => book.id !== bookID); //Filtering out the book we don't need.
        await this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .update(
            {
              wishlist: {
                books: wishlist
              }
            },
          );
    await this.updateMatches();
  }

  async removeFromOwnedlist(bookID) {
    let ownedlist = await this.getOwnedlist();
    ownedlist = ownedlist.filter(book => book.id !== bookID); //Filtering out the book we don't need.
        await this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .update(
            {
              ownedlist: {
                books: ownedlist
              }
            },
          );
    await this.updateMatches();
  }

  async addToWishlist(bookObject) {
    let wishlist = await this.getWishlist();
    if (!wishlist.some(obj => obj.id === bookObject.id)) {
      let ownedlist = await this.getOwnedlist();
      if (!ownedlist.some(obj => obj.id === bookObject.id)) {
        wishlist.push(bookObject);
        await this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .set(
            {
              wishlist: {
                books: wishlist
              }
            },
            { merge: true }
          );
      }
    }
    await this.updateMatches();
  }

  async addToOwnedlist(bookObject) {
    let ownedlist = await this.getOwnedlist();
    if (!ownedlist.some(obj => obj.id === bookObject.id)) {
      let wishlist = await this.getWishlist();
      if (!wishlist.some(obj => obj.id === bookObject.id)) {
        ownedlist.push(bookObject);
        await this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .set(
            {
              ownedlist: {
                books: ownedlist
              }
            },
            { merge: true }
          );
      }
    }
    await this.updateMatches();
  }

  async findUserMatches() {
    let ownedlist = await this.getOwnedlist();
    let wishlist = await this.getWishlist();
    //Get wishlists of OTHER users
    //Get all other user UID's
    let users = await this.getUsers();
    let matches = [];
    users = users.filter(user => user !== this.auth.currentUser.uid);
    if(users){
      users.forEach(async user => {
        let userOwnedList = await this.getOwnedlist(user);
        let userWishList = await this.getWishlist(user);
        console.log("User ", await this.getUsername(user), userWishList, userOwnedList);
        wishlist.forEach(wBook => {
          const matchedOwnedBook = userOwnedList.find(
            uOBook => uOBook.id === wBook.id
          );
          if (matchedOwnedBook) { //If user has a book we want
            let matchedWishlistBook;
            userWishList.forEach(async uWBook => {
              matchedWishlistBook = ownedlist.find(
                oBook => oBook.id === uWBook.id
              );
              if (matchedWishlistBook) { //If we have a book the user wants
                console.log("Matched Wishlist Book", matchedOwnedBook, matchedWishlistBook, user);
                const userName = await this.getUsername(user);
                matches.push({
                  full: true,
                  userID: user,
                  userName: userName,
                  yourBook: matchedWishlistBook,
                  hisBook: matchedOwnedBook
                });
              }
            });
          }
        });
        //First check if ownedList matches any of wishlist?
        //Then check if wishsList of theirs matches your ownedList
        //If your ownedList matches their wishlist and if your wishlist matches their owned list
        //Get full match = true
        //else incomplete match = true
      });
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(matches);
      }, 1500);
    });
  }

  async findUserMatches() {
    let ownedlist = await this.getOwnedlist();
    let wishlist = await this.getWishlist();
    //Get wishlists of OTHER users
    //Get all other user UID's
    let users = await this.getUsers();
    let matches = [];
    users = users.filter(user => user !== this.auth.currentUser.uid);
    if(users){
      for(let user of users)
      {
        let userOwnedList = await this.getOwnedlist(user);
        let userWishList = await this.getWishlist(user);
        for(let wBook of wishlist)
        {
          const matchedOwnedBook = userOwnedList.find(
            uOBook => uOBook.id === wBook.id
          );
          if(matchedOwnedBook) {
            let matchedWishlistBook;
            for(let uWBook of userWishList)
            {
              matchedWishlistBook = ownedlist.find(
                oBook => oBook.id === uWBook.id
              );
              if (matchedWishlistBook) {
                const userName = await this.getUsername(user);
                matches.push({
                  full: true,
                  userID: user,
                  userName: userName,
                  yourBook: matchedWishlistBook,
                  hisBook: matchedOwnedBook
                });
                break;
              }
            }
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(matches);
      }, 1500);
    });
  }

  async updateMatches() {
    let updatedMatches = await this.findUserMatches();
    if(updatedMatches){
      console.log("Before", updatedMatches)
      updatedMatches = updatedMatches.filter((v,i,a)=>a.findIndex(t=>(t.userID === v.userID && t.hisBook.id === v.hisBook.id && t.yourBook.id === v.yourBook.id))===i);
      console.log("After", updatedMatches);
      await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set(
        {
          deals: {
            matches: updatedMatches
          }
        },
        { merge: true }
      );
    }
  }

  async createChatRoom(roomID, uid2)
  {
    const room = {
      roomID: roomID,
      uid1: this.auth.currentUser.uid,
      uid2: uid2
    }
    await this.db
    .collection("users")
    .doc(this.auth.currentUser.uid)
    .set(
      {
        chatRooms: {
          rooms: room
        }
      },
      { merge: true }
    );
  }

  async getUserChats(uid = this.auth.currentUser.uid)
  {
    let rooms;
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(function(doc) {
        rooms = doc.data().chatRooms.rooms;
      })
      .catch(function(error) {
        console.log("Error getting chat rooms:", error);
      });
    if (rooms) return rooms;
  }

  //IMPLEMENT DATABASE SOLUTION FOR MESSAGING
  //IMPLEMENT USER CURRENT USER PROFILE NAME
}

export default new Firebase();
