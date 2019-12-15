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

  async register(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set({
        wishlist: {
          books: []
        },
        ownedlist: {
          books: []
        }
      });
    // return this.auth.currentUser.updateProfile({
    //     displayName: name
    // })
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

  async getUsers() {
    let userList;
    const snapshot = await this.db.collection("users").get();
    const documents = [];
    snapshot.forEach(doc => documents.push(doc.id));

    return documents;
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
    // await this.db
    // .collection("users")
    // .doc(this.auth.currentUser.uid).update({
    //     wishlist: {
    //         books: app.firestore.FieldValue.arrayUnion(bookObject)
    //     }
    // });
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
  }

  async findUserMatches() {
    let ownedlist = await this.getOwnedlist();
    let wishlist = await this.getWishlist();
    //Get wishlists of OTHER users
    //Get all other user UID's
    let users = await this.getUsers();
    let matches = [];
    users = users.filter(user => user != this.auth.currentUser.uid);
    users.forEach(async user => {
      let userOwnedList = await this.getOwnedlist(user);
      let userWishList = await this.getWishlist(user);
      wishlist.forEach(wBook => {
        const matchedOwnedBook = userOwnedList.find(
          uOBook => uOBook.id === wBook.id
        );
        if (matchedOwnedBook) {
          let matchedWishlistBook;
          userWishList.forEach(uWBook => {
            matchedWishlistBook = ownedlist.find(
              oBook => oBook.id === uWBook.id
            );
          });
          if (matchedWishlistBook) {
            //Full match found.
            matches.push({
              full: true,
              userID: user,
              yourBook: matchedWishlistBook,
              hisBook: matchedOwnedBook
            });
          }
        }
      });
      console.log(matches);

      //First check if ownedList matches any of wishlist?
      //Then check if wishsList of theirs matches your ownedList
      //If your ownedList matches their wishlist and if your wishlist matches their owned list
      //Get full match = true
      //else incomplete match = true
    });
  }

  //IMPLEMENT DATABASE SOLUTION FOR MESSAGING
  //IMPLEMENT USER CURRENT USER PROFILE NAME
}

export default new Firebase();
