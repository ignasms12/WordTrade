import React from 'react';
//import Form from './components/form';
import WishList from './components/wishlist';
import OwnedList from './components/ownedlist';
import Messaging from './components/messaging';
import BookDetails from './components/bookdetails';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';

class App extends React.Component{
  // state = {
  //   credentials: {
  //       username: '',
  //       password: ''
  //     }
  // }

  // handleChangeUser = (e) => {
  //   this.setState({
  //       credentials: {
  //         username: e.target.value
  //       }
  //   });
  // }

  // handleChangePsw = (e) => {
  //     this.setState({
  //       credentials: {
  //         password: e.target.value 
  //       }
  //     });  
  // }

  render(){
     return(
       <Router>
        <div className="app">
          {/* <Form 
            creds={this.state.credentials} 
            handleChangeUser={this.handleChangeUser}
            handleChangePsw={this.handleChangePsw}/> */}
            <Switch>
              {/* <Route exact path='/' component={Form} /> */}
              <Route exact path='/home' component={Home} />
              <Route exact path='/wishlist' component={WishList} />
              <Route exact path='/ownedlist' component={OwnedList} />
              <Route exact path='/messaging' component={Messaging} />
              <Route exact path='/bookdetails' component={BookDetails} />
            </Switch>
        </div>
      </Router>
     )
  }
}

export default App;
