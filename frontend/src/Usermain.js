import React, { Component } from 'react'
import Asdf from './Asdf'
import Timeseries from './Timeseries'
import Viewmodify from './Viewmodify'
import { Route, Switch, Link } from 'react-router-dom'

class Usermain extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div class='usermain'> 
        <ul class="tabs blue accent-1">
          <li class="tab"><Link to={this.props.match.path + '/timeseries'}>Time Series</Link></li>
          <li class="tab"><Link to={this.props.match.path + '/viewmodify'}>View/Modify Date</Link></li>
          <li class="tab"><Link>Stats</Link></li>
        </ul>
        <Route path={this.props.match.path + '/timeseries'} component={Timeseries}></Route>
        <Route path={this.props.match.path + '/viewmodify'} component={Viewmodify}></Route>
      </div>
    ) 
  }
}
export default Usermain;