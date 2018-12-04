import React, { Component } from 'react';
// css
import './Notice.scss'

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className='notice-box'>
        <div className='notice-icon'></div>
        <div className='notice-content'>
          <div className='notice-item'>1</div>
          <div className='notice-item'>2</div>
          <div className='notice-item'>3</div>
          <div className='notice-item'>4</div>
        </div>
        <div className='right-icon'></div>
      </div> 
    )
  }
}
export default Notice;