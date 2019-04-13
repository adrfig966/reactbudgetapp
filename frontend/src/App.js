import React, { Component } from 'react';
import Navbar from './Navbar';
import Content from './AppContent'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      menuitems: [
        {label: 'Login', link: '/'}, 
        {label: 'Home', link: '/home'},
        {label: 'Account', link: '/profile'}
        ],
      active: 'Login'
    }
  }
  render() {
    return (
      <Router>
        <Navbar menuitems={this.state.menuitems}/>
        <Content/>
      </Router>
    );
  }
}

export default App;
