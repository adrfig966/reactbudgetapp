import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Navbar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <nav className="blue accent-1">
        <a href="#" className="brand-logo right">Budget</a>
        <ul id="nav-mobile" className="left" >
          {this.props.menuitems.map(item =>{
            return <li><Link to={item.link}>{item.label}</Link></li>
          })}
        </ul>
      </nav>

    );
  }

}

export default Navbar;