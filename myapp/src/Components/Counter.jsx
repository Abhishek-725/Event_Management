//import React from 'react';
import React, { Component } from "react";
import { useState } from "react";

class Counter extends Component {

  // constructor(){
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }
  state = {
    count:0,
    imageUrl:"https://picsum.photos/300",
    tags:['tag1','tag2','tag3']
  };
  // styles = {
  //   fontSize : 500,
  //   fontWeight : 'bold'
  // };
  
 
  render() {
    return (
      <>
       const [count_ , inrcount_] = useState();
        <h1>Hello World!Its Counter.</h1>
        <img src={this.state.imageUrl} alt=""/><br/>
        <span className={this.getBadgeColor()}>{this.formatCount()}</span>&emsp;&emsp;
        <button className="btn btn-primary" onClick={this.handleIncrement} >Increment</button>
        <ul>
          {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>

      </>
    );
  }
   formatCount(){
    const {count} = this.state;
    return count===0 ? <h3 style={{fontSize:20,margin:0}}>Zero</h3> : <h3 >{count}</h3>;
  }
  getBadgeColor(){
    let classes = '';
    classes = this.state.count===0 ? "badge rounded-pill bg-primary":"badge bg-warning";
    return  classes;
  }

  handleIncrement = () => {
    //console.log('Increment',this);
    this.setState( {count : this.state.count+1}) 
  }
  
}

export default Counter;

