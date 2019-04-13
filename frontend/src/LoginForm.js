import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.state.username = '';
    this.state.password ='';
    
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleInput(e){

    if(e.target.id == 'user_name'){
      this.setState({username: e.target.value});
    }
    else{
      this.setState({password: e.target.value});
    }
  }
  handleLogin(e){
    axios.post('https://serverforstuff-adrfigu966.c9users.io/login', {
      username: this.state.username,
      password: this.state.password
    }, {withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  testReq(e){
    axios.get('https://serverforstuff-adrfigu966.c9users.io/timeseries?start=2019-03-27', 
    {withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render(){
    return(
      <form class="user-login">
        <h3>Please login</h3>
        <div class="row">
          <div class="input-field col s12 m6">
            <input id="user_name" type="text" onChange={this.handleInput} class="validate" data-length="15"></input>
            <label class="active" htmlFor="user_name">User name</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="pass_word" type="password" onChange={this.handleInput} class="validate" data-length="15"></input>
            <label class="active" htmlFor="pass_word">Password</label>
          </div>
        </div>
        <a class="waves-effect waves-light btn blue accent-2" onClick={this.handleLogin}>
          <i class="material-icons right">lock_open</i>
          Login
        </a>
        <a class="waves-effect waves-light btn blue accent-2" onClick={this.testReq}>
          <i class="material-icons right">closed</i>
          Testing
        </a>
      </form>
    );
  }

}

export default LoginForm;