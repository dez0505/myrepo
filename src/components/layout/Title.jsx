import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import './Title.scss'
const topicPic = require('../../images/title-images/title.png')
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
Title.propTypes = {
  // theme: PropTypes.array,
}
export default Title