import React, { Component } from 'react';
import './TabHeader.scss'
import PropTypes from 'prop-types';

export default class TabHeader extends Component {
  static propTypes = {
    HomeTabMenuList: PropTypes.array,
    optionalTabMenuList: PropTypes.array,
    activeHomeTabIndex: PropTypes.number,
    activeOptionalTabIndex: PropTypes.number,
    type: PropTypes.string
  };
  componentDidMount() {
    console.log(this.props)
    if (this.props.activeHomeTabIndex >= 0 && this.props.type === 'home') {
      this.updateHomeWhichLoading(this.props.activeHomeTabIndex)
    }
    // } else if (this.props.activeOptionalTabIndex >= 0 && this.props.type === 'optional') {
    //   this.updateOptionalWhichLoading(this.props.activeOptionalTabIndex)
    // }
  }
 
  componentWillReceiveProps(newProps, newState) {
    if(newProps.type === 'home' ) {
      if(newProps.activeHomeTabIndex !== this.props.activeHomeTabIndex){
        this.updateHomeWhichLoading(newProps.activeHomeTabIndex)
      }
    } else if (newProps.activeOptionalTabIndex !== this.props.activeOptionalTabIndex) {
      this.updateOptionalWhichLoading(newProps.activeOptionalTabIndex)
    }
  }
  updateHomeWhichLoading (activeIndex) {
    this.props.resetState()
    this.props.updateOptionalTabIndex(-1) // 问题
    console.log(3333, activeIndex)
    setTimeout(() => {
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
    }, 200);
    
  }
  updateOptionalWhichLoading (activeIndex) {
    this.props.resetState()
    switch (activeIndex) {
      case 0:
        this.props.updateInterfaceState('news')
        break;
      case 1:
        this.props.updateInterfaceState('qus')
        break;
      case 2:
        this.props.updateInterfaceState('bigEvent')
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
  render() {
    const tabClassName = this.props.type === 'home' ? 'tab-box home-tab bot-border' : 'tab-box optional-tab bot-border';
    const menuList = this.props.type === 'home' ? this.props.HomeTabMenuList : this.props.optionalTabMenuList;
    const activeIndex = this.props.type === 'home' ? this.props.activeHomeTabIndex : this.props.activeOptionalTabIndex;
    const updateTabIndex =  this.props.type === 'home' ? this.props.updateHomeTabIndex: this.props.updateOptionalTabIndex
    return (
      <div className={tabClassName}>
        {
          menuList.map((item,index) => {
            const itemClass = activeIndex === index ? 'tab-item active' :'tab-item' 
            return (
              <div 
                className={itemClass} 
                key={index} onClick={()=>updateTabIndex(index)}>
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
