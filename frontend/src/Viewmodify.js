import React, { Component } from 'react'
import { DatePicker } from 'react-materialize'
import moment from 'moment'
import axios from 'axios'

class Modifyadd extends  Component {
  constructor(props){
    super(props);
    this.state = {
      startdate: '',
      datepicker: <DatePicker options={{onSelect: this.onDateChange.bind(this), format: 'yyyy-mm-dd'}}/>,
      initialresponse: [],
      newvalues: []
    };
    this.buildForms = this.buildForms.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }
  onDateChange = function(date){
    this.setState({startdate: moment(date).format('YYYY-MM-DD')});
    axios.get('https://serverforstuff-adrfigu966.c9users.io/timeseries', { params: {
        start: moment(date).format('YYYY-MM-DD')
      }, withCredentials: true})
      .then(function (response) {
        console.log(response.data);
        this.setState({initialresponse: [...response.data]});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  buildForms = function(category){
    return <div class="row">
        <div class="input-field col s12">
          <input id={"amount-"+category.name} onChange={this.handleUpdateInput} placeholder={category.spent} type="number" min='0' class="validate"/>
          <label class="active" htmlFor="first_name">{category.name}</label>
        </div>
      </div>
  }
  
  handleUpdateInput = function(e){
    var name = e.target.getAttribute("id").split("-")[1];
    var newvalue = e.target.value;
    var newvalues = this.state.newvalues;
    newvalues[name] = newvalue;
    this.setState({newvalues: newvalues});
    console.log(this.state.newvalues);
  }
  handleUpdateClick = function(e){ //do multiple requests with all
    console.log("submitted", this.state.newvalues);
  }
  handleNew = function(e){
    var which = e.target.getAttribute("id").split("-")[0];
  }
  render(){
    return(
      <div>
        <span>Select a date to view or edit</span>
        {this.state.datepicker}
        {/*this.state.startdate!=''?"nun":"sum"*/}
        {this.state.initialresponse.map(elem=>{
          return <form>
            {elem.categories.map(this.buildForms)}
            <a class="waves-effect waves-light btn blue accent-2" onClick={this.handleUpdateClick}>
              Update
              <i class="material-icons right">check</i>
            </a>
          </form>;
        })}
        <div class="row">
              <div class="input-field col s6">
                <input id={"name-newcategory"} onChange={this.handleNew} type="text" class="validate"/>
                <label htmlFor="first_name">New spendings category</label>
              </div>
              <div class="input-field col s6">
                <input id={"amount-newcategory"} onChange={this.handleNew} type="number" min='0' class="validate"/>
                <label htmlFor="first_name">Amount</label>
              </div>
        </div>
      </div>
    )
  }
}

export default Modifyadd;