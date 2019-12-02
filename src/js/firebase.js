import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

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
        //this.db = this.app.firestore();
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
        // return this.auth.currentUser.updateProfile({
        //     displayName: name
        // })
    }
    //@TODO ADD EMAIL VERIFICATION
    //ADD AUTH LISTENER TO SOME COMPONENT
    //IMPLEMENT DATABASE SOLUTION FOR MESSAGING
    //IMPLEMENT USER CURRENT USER PROFILE NAME
}

export default new Firebase();