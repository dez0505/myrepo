import React, { Component } from 'react';
import './Header.scss'
import { goToFunction } from '@/utils/common.js'
class Header extends Component {
  constructor(props) {
    super(); //可以不给props
  }
  componentDidMount() {
    console.log('headerProps', this.props)
  }
  render() {
    return (
      <div className='header-box'>
        <div onClick={() => goToFunction(80004)}>客服</div>
        <div className='input-box' onClick={() => goToFunction(10134)}>
          <input className='input' disabled placeholder='代码/简拼/功能/资讯/数据'></input> 
          <div className='search-icon'></div> 
        </div>
        <div className='scan-icon' onClick={() => goToFunction(10129)}></div>
        <div className='message-icon' onClick={() => goToFunction(10067)}></div>
      </div>
    ) 
  }
}
export default Header