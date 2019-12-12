import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firestore'

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

class Firebase
{
    constructor()
    {
        app.initializeApp(fbConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    getAuth()
    {
        return this.auth;
    }

    login(email, password)
    {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout()
    {
        return this.auth.signOut();
    }

    async register(email, password)
    {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.db
        .collection("users")
        .doc(this.auth.currentUser.uid).set({
            wishlist: {
                "books":[]
            },
            ownedlist: {
                "books":[]
            }
        });
        // return this.auth.currentUser.updateProfile({
        //     displayName: name
        // })
    }

    async getWishlist()
    {
        let wishlist;
        await this.db
        .collection("users")
        .doc(this.auth.currentUser.uid)
        .get().then(function(doc) {
            wishlist = doc.data().wishlist;
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        if(wishlist)
            return wishlist;
    }

    async getOwnedlist()
    {
        let ownedlist;
        await this.db
        .collection("users")
        .doc(this.auth.currentUser.uid)
        .get().then(function(doc) {
            ownedlist = doc.data().ownedlist;
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        if(ownedlist)
            return ownedlist;
    }

    async addToWishlist(bookObject)
    {
        let wishlist = await this.getWishlist(), bookArr = wishlist.books;
        if(!bookArr.some(obj => obj.id === bookObject.id))
        {
            let ownedlist = await this.getOwnedlist(), ownedArr = ownedlist.books;
            if(!ownedArr.some(obj => obj.id === bookObject.id))
            {
                bookArr.push(bookObject);
                await this.db
                .collection("users")
                .doc(this.auth.currentUser.uid).set({
                    wishlist: {
                        books: bookArr
                    }
                }, {merge: true})
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

    async addToOwnedlist(bookObject)
    {
        let ownedlist = await this.getOwnedlist(), bookArr = ownedlist.books;
        if(!bookArr.some(obj => obj.id === bookObject.id))
        {
            let wishlist = await this.getWishlist(), wishedArr = wishlist.books;
            if(!wishedArr.some(obj => obj.id === bookObject.id))
            {
                bookArr.push(bookObject);
                await this.db
                .collection("users")
                .doc(this.auth.currentUser.uid).set({
                    ownedlist: {
                        books: bookArr
                    }
                }, {merge: true})
            }
        }
    }


    //IMPLEMENT DATABASE SOLUTION FOR MESSAGING
    //IMPLEMENT USER CURRENT USER PROFILE NAME
}

export default new Firebase();