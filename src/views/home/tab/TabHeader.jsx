import React, { Component } from 'react';
import './TabHeader.scss'
import PropTypes from 'prop-types';

import { getManDianParams, getQueryString } from '@/utils/common'

export default class TabHeader extends Component {
  static propTypes = {
    HomeTabMenuList: PropTypes.array,
    optionalTabMenuList: PropTypes.array,
    activeHomeTabIndex: PropTypes.number,
    activeOptionalTabIndex: PropTypes.number,
    type: PropTypes.string
  };
  componentDidMount() {
    if (this.props.activeHomeTabIndex >= 0 && this.props.type === 'home' && this.props.watch) {
      this.updateHomeWhichLoading(this.props, this.props.activeHomeTabIndex)
    } 
  }
 
  componentWillReceiveProps(newProps, newState) {
    if(!newProps.watch) return
    if(newProps.activeHomeTabIndex !== this.props.activeHomeTabIndex && newProps.activeHomeTabIndex>=0){
      this.goToTabFunction('tab' + newProps.activeHomeTabIndex)
      this.updateHomeWhichLoading(newProps, newProps.activeHomeTabIndex)
    }
    if (newProps.activeOptionalTabIndex !== this.props.activeOptionalTabIndex && newProps.activeOptionalTabIndex>=0) {
      if(this.props.activeOptionalTabIndex!==-1) {
        this.goToTabFunction('optional' + newProps.activeOptionalTabIndex)
      }
      this.updateOptionalWhichLoading(newProps, newProps.activeOptionalTabIndex)
    }
  }
  // tab埋点
  goToTabFunction (tabIndex) {
    let clickParam = getManDianParams(tabIndex)
    if (getQueryString('platform').toLowerCase().indexOf('iphone') >= 0) {
      console.log(99999999999999, 'ehtsec@logNative?' + clickParam.slice(1))
      window.location.href = 'ehtsec@logNative?' + clickParam.slice(1)
    } else {
      console.log(99999999999999, 'ehtsec://logNative?' + clickParam.slice(1))
      window.location.href = 'ehtsec://logNative?' + clickParam.slice(1)
    }
  }
  updateHomeWhichLoading (newProps, activeIndex) {
    if(newProps.activeHomeTabIndex!==3) {
      this.props.updateOptionalTabIndex(-1) // 问题
    }
    switch (activeIndex) {
      case 0:
        this.props.updateInterfaceState('topLine')
        break;
      case 1:
        this.props.updateInterfaceState('cheif')
        break;
      case 2:
        this.props.updateInterfaceState('liveA')
        break;
      case 3:
        // this.props.updateInterfaceState('optional')
        this.props.updateOptionalTabIndex(0)
        break;
      case 4:
        this.props.updateInterfaceState('more')
        break;
      default:
        break;
    }
  }
  updateOptionalWhichLoading (newProps, activeIndex) {
    // if(newProps.activeHomeTabIndex === '4' && activeIndex==='0') return
    switch (activeIndex) {
      case 0:
        this.props.updateInterfaceState('news')
        break;
      case 1:
        this.props.updateInterfaceState('qus')
        break;
      case 2:
        this.props.updateInterfaceState('event')
        break;
      case 3:
        this.props.updateInterfaceState('notice')
        break;
      case 4:
        this.props.updateInterfaceState('report')
        break;
      default:
        break;
    }
  }
  openPopupEvent() {
    window.location.href = '@showTeams'
  }
  switchTabIndex(index) {
    if(index===this.props.index) return
    const updateTabIndex =  this.props.type === 'home' ? this.props.updateHomeTabIndex: this.props.updateOptionalTabIndex
    this.props.resetState()
    updateTabIndex(index)
  }
  render() {
    const tabClassName = this.props.type === 'home' ? 'tab-box home-tab bot-border' : 'tab-box optional-tab bot-border';
    const menuList = this.props.type === 'home' ? this.props.HomeTabMenuList : this.props.optionalTabMenuList;
    const activeIndex = this.props.type === 'home' ? this.props.activeHomeTabIndex : this.props.activeOptionalTabIndex;
    const selectClassName = this.props.theme === 'night' ? 'select-type night' : 'select-type'
    const optionalTeam = this.props.optionalTeam
    return (
      <div className={tabClassName}>
       <div className={selectClassName} 
       style={{ display: this.props.type === 'home' ? 'none' : ''}} 
       onClick={() => this.openPopupEvent()}>{ optionalTeam||'暂无分组' }
        <span className='square-icon'>
          <span className={this.props.theme==='night'?'night':''}></span>
        </span>
       </div>
        {
          menuList.map((item,index) => {
            const itemClass = activeIndex === index ? 'tab-item active' :'tab-item' 
            return (
              <div 
                className={itemClass} 
                key={index} onClick={()=>this.switchTabIndex(index)}>
                <div className='line'></div>
                {item}
              </div>
            );
          })
        }
      </div>
    );
  }
}
