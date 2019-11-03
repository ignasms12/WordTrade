import React from 'react';
import Form from './components/form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';

class App extends React.Component{
  state = {
    credentials: {
        username: '',
        password: ''
      }
  }

  handleChangeUser = (e) => {
    this.setState({
        credentials: {
          username: e.target.value
        }
    });
  }

  handleChangePsw = (e) => {
      this.setState({
        credentials: {
          password: e.target.value 
        }
      });  
  }

  render(){
     return(
       <Router>
        <div className="app">
          {/* <Form 
            creds={this.state.credentials} 
            handleChangeUser={this.handleChangeUser}
            handleChangePsw={this.handleChangePsw}/> */}
            <Switch>
              <Route exact path='/' component={Form} />
              <Route exact path='/home' component={Home} />
            </Switch>
        </div>
      </Router>
     )
  }
}

export default App;
