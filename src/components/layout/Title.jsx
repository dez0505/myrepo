import React, { Component } from 'react';
import './Title.scss'
const topicPic = require('../../images/home/title.png')
// const topicPic = require('../../images/home/title-red.png')
class Title extends Component {
    constructor(props) {
      super(); //可以不给props
    }
    componentDidMount() {
     
    }
    render() {
      return (
        <div className='Title-box'>
          <img src={topicPic} alt=""/>
          <div className='txt'>{this.props.title}</div>
        </div>
      ) 
    }
  }
  export default Title