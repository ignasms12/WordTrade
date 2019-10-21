import React from 'react';
import Form from './components/form';
import './App.css';

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
       <div className="app">
        <div>Hello, {this.state.credentials.username}</div>
        <Form 
          creds={this.state.credentials} 
          handleChangeUser={this.handleChangeUser}
          handleChangePsw={this.handleChangePsw}/>
       </div>
     )
  }
}

export default App;
