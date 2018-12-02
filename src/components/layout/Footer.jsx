import React, { Component } from 'react';
import './Footer.scss'
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      footerMenu: ['首页', '行情', '交易', '资讯', '我的']
    };
  }
  render() {
    return (
      <div className='footer-box'>
         {this.state.footerMenu.map(item=>{
           return (<div className='footer-item' key={item}>{item}</div>)
         })}
      </div>
    );
  }
}

export default Footer;