import React, { Component } from 'react'

export default class form extends Component {
    constructor(props) {
        super(props);
        //this.state = {user: '', psw: ''};
      }

    handleSubmit = (e) => {
        //console.log('A name was submitted: ' + this.state.user + this.state.psw);
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username: </label><br/>
                <input 
                    type="text"
                    value={this.props.creds.username}
                    onChange={this.props.handleChangeUser} 
                /><br/>
                <label>Password: </label><br/>
                <input 
                    type="password" 
                    name="psw"
                    value={this.props.creds.password}
                    onChange={this.props.handleChangePsw}>
                </input><br/>
                {console.log(this.props.creds)}
                <button type="submit">Submit</button>
            </form>
        )
    }
}
