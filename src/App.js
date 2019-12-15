import React from 'react';
import Form from './components/form';
import WishList from './components/wishlist';
import OwnedList from './components/ownedlist';
import Deals from './components/deals';
import Messaging from './components/messaging';
import BookDetails from './components/bookdetails';
import Settings from './components/settings';
import editProfile from './components/editProfile';
import editEmail from './components/editEmail';
import editPassword from './components/editPassword';
import firebase from './js/firebase';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/home';
import VerifyEmail from './components/verifyEmail';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
  }

  componentDidMount() {
    this.authListener();
  }
  authListener = () => {
    firebase.getAuth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() { //Scuffed verification check-based redirection
    return (
      <Router>
       <div className="app">
           <Switch>
             <Route exact path='/' component={Form} /> 
             <Route exact path='/home' component={Home} />
             <Route exact path='/wishlist' component={WishList} />
             <Route exact path='/ownedlist' component={OwnedList} />
             <Route exact path='/deals' component={Deals} />
             <Route exact path='/messaging' component={Messaging} />
             <Route exact path='/bookdetails' component={BookDetails} />
             <Route exact path='/verifyEmail' render={(props) => <VerifyEmail {...props} user={firebase.auth.currentUser} />} />
             <Route exact path='/settings' component={Settings} />
             <Route exact path='/editProfile' component={editProfile} />
             <Route exact path='/editEmail' component={editEmail} />
             <Route exact path='/editPassword' component={editPassword} />
           </Switch>
           {/* {this.state.user ? (this.state.user.emailVerified ?  (window.location.pathname === "/" ? <Redirect to='/wishlist'/> : console.log()) : <Redirect to='/verifyEmail' />) : <Redirect to='/' /> } */}
       </div>
     </Router>
    )
  }
}
 export default App;