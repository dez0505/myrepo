import React, { Component } from 'react';
import './Nav.scss'
const pic = require('../../images/hold_position.png');
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
          {url:pic ,txt:'一键打新'},
          {url:pic ,txt:'新品商城'},
          {url:pic ,txt:'数据中心'},
          {url:pic ,txt:'资金持仓'},
          {url:pic ,txt:'一键打新'},
          {url:pic ,txt:'新品商城'},
          {url:pic ,txt:'数据中心'},
          {url:pic ,txt:'资金持仓'}
      ]
    }
  }
  componentDidMount(){
    console.log('props', this.props)
  }
  render() {
    return (
      <div className='nav-warpper'>
        <div className="navlist">
          {
            this.state.navList.map((item,index)=>{
                return(
                    <div className="navitem" data-id={index} key={index}>
                        <img src={item.url} alt=""/>
                        <div>{item.txt}</div>
                    </div>
                ) 
            })
          }
        </div>
      </div>
    ) 
  }
}
export default Nav