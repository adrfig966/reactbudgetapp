import React, { Component } from 'react'
import LoginForm from './LoginForm'
import About from './About'
import Timeseries from './Timeseries'
import Usermain from './Usermain'
import { Route } from 'react-router-dom'
import monogram from './Monogram.svg'

class AppContent extends Component{
  constructor(props){
    super(props);
    this.state={
      isAuthenticated: true
    }
  }
  render(){
    return(
      <div className='budget-content container'>
          <Route exact path='/' component={LoginForm}></Route>
          <Route path='/home' component={this.state.isAuthenticated?Usermain:About}></Route>
          <hr></hr>
          <img src='' height='60px'/>
          <div id='signature'>2019</div>
          
      </div>
    );
  }
}

export default AppContent;