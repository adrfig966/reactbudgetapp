import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

class About extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div class='app-about'>
        <h3>Welcome</h3> 
        Stuff goes here
      </div>
    )
  }
}

export default About;