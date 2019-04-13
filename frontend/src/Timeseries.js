import React, { Component } from 'react'
import { DatePicker } from 'react-materialize'
import moment from 'moment'
import axios from 'axios'
import ChartistGraph from 'react-chartist';


class Timeseries extends  Component {
  constructor(props){
    super(props);
    this.state = {
      startdate: '',
      enddate: '',
      menu: <div>
        <span>Enter start date</span>
        <DatePicker options={{onSelect: this.onStartChange.bind(this), format: 'yyyy-mm-dd'}}/>
        <span>Enter end date</span>
        <DatePicker options={{onSelect: this.onEndChange.bind(this), format: 'yyyy-mm-dd'}}/>
      </div>,
      showmenu: true,
      results: [],
      categories: [],
      graph: null
    };
    this.categorySelect = this.categorySelect.bind(this);
  }
  onStartChange(date){
    this.setState({startdate: moment(date).format('YYYY-MM-DD')});
  }
  onEndChange(date){
    this.setState({enddate: moment(date).format('YYYY-MM-DD')});
  }
  componentDidUpdate(){
    if(this.state.startdate != '' & this.state.enddate != ''){
      axios.get('https://serverforstuff-adrfigu966.c9users.io/timeseries', { params: {
        start: this.state.startdate,
        end: this.state.enddate
      }, withCredentials: true})
      .then(function (response) {
        var docs = response.data;
        var uniquecategories = [];
        
        //Finds all unique categories of spendings in returned timeseries
        for(var i = 0; i < docs.length; i++){
          var categories = docs[i].categories;
          for(var j = 0; j < categories.length; j++){
            if(!uniquecategories.includes(categories[j].name)){
              uniquecategories.push(categories[j].name);
            }
          }
        }
        console.log("Unique categories: ", uniquecategories);
        this.setState({
          results: docs,
          categories: uniquecategories,
          startdate: '',
          enddate: ''
        });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  categorySelect(e){

    //What ever category is clicked will be used for parsing data into chartist' format
    var labels = [];
    var series = [];
    this.state.results.forEach(element => {
      labels.push(element.date);
      for(var i = 0; i < element.categories.length; i++){
        if (element.categories[i].name == e.target.innerText){
          series.push(element.categories[i].spent);
          return;
        }
      }
      series.push(null);
    });
    var options = {
      axisX: {
        labelInterpolationFnc: function(value) {
          return moment(value).format('MMM D');
        }
      }
    };
    var data = {labels: labels, series: [series]};
    this.setState({graph: <ChartistGraph data={data} type={'Line'} options={options}/>} );
  }
  render(){
    return(
      <div class='user-timeseries'>
        {this.state.showmenu?this.state.menu:null}

        <ul className='collection'>{this.state.categories.map((cat)=>{
          return <li key={cat} className='collection-item' onClick={this.categorySelect}>{cat}</li>;
        })}</ul>
        
        {this.state.graph}
      </div>
    );
  }
}

export default Timeseries;