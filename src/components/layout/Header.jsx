import React, { Component } from 'react';
import './Header.scss'
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='header-box'>
        <div>客服</div>
        <div className='input-box'>
          <input className='input' placeholder='代码 / 简拼 / 常用功能'></input> 
          <div className='search-icon'></div> 
        </div>
        <div className='scan-icon'></div>
        <div className='message-icon'></div>
      </div>
    ) 
  }
}
export default Header