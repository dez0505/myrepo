import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { Icon } from 'antd-mobile';
import Arrow from './Arrow.jsx'
import './BetterScroll.scss'
export default class BetterScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: '下拉刷新',
      refreshTime: '刷新时间',
      botText: '上拉加载',
      topIconDirection: 'down',
      scroll: null
    };
  }
  _initScroll() {
    this.scroll = new BScroll('#wrapper',{
      probeType: 3,
      click: true,
      scrollX: true,
      pullDownRefresh: {
        threshold: 60,
        stop: 50
      },
      pullUpLoad: {
        threshold: -20
      }
    })
  }
  componentDidMount() {
    this._initScroll()
  }
  render() {
    return (
      <div id="wrapper" className='scroll-wrapper'>
        <div className="scroll-content">
        <div className="refresh-box">
          <div className="scroll-refresh">
            <div className="lf-icon">
              <Arrow className='arrow'></Arrow> 
              {/* <Arrow className={'arrow ' + this.state.topIconDirection}></Arrow>  */}
              <Icon type='loading' text='loading' />
            </div>
            <div className="center-text">
              <div>{this.state.topText}</div>
              <div>{this.state.refreshTime}</div>
            </div>
            <div style={{width:'30px',height:'30px'}}></div>
          </div>
        </div>
        {this.props.children}
        <div className="load-box">
          <div className="scroll-load">
            <div className="bottom-icon">
              <Icon type='loading' text='loading' />
            </div>
            <div className="bot-text">{this.state.botText}</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
