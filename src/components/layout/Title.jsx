import React, { Component } from 'react';
import './Title.scss'
class Title extends Component {
    constructor(props) {
      super(); //可以不给props
    }
    componentDidMount() {
     
    }
    render() {
      return (
        <div className='Title-box'>
          <img src="../../images/home/title.png" alt=""/>
          <div className='txt'>{this.props.title}</div>
        </div>
      ) 
    }
  }
  export default Title