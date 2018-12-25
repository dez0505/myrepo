import React, { Component } from 'react';
import './TabHeader.scss'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// utils
import { getManDianParams, getQueryString } from '../../utils/common'
// actions
import { updateTabIndex } from '../../actions/tab'
import { updatePageConfig } from '../../actions/index'
import { updateInterfaceState, resetState } from '../../actions/list'

class TabHeader extends Component {
  componentDidMount() {
    if(this.props.watch && this.props.type ==='home') {
      this.handleSwitchHomeIndex(0,false)
    }
  }
 
  componentWillReceiveProps(newProps) {
    if(!this.props.watch) return  //只有tobbox中的才有效，首页的监听无效
    if(this.props.type === newProps.activeTabConfig.type){  // 首页切换的内容要对的上是不是属于当前的tab中的
      // 判断其中哪些内容改变需要执行这个方法
      if((newProps.activeTabConfig.index !== this.props.activeTabConfig.index || newProps.activeTabConfig.type!==this.props.activeTabConfig.type)) {
        if(newProps.activeTabConfig.type === 'home') {
          this.handleSwitchHomeIndex(newProps.activeTabConfig.index )
        } else if (newProps.activeTabConfig.type === 'optional') {
          this.handleSwitchOptionalIndex(newProps.activeTabConfig.index)
        }
      }
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
  // 改变当前Hometab的类型
  updateHomeWhichLoading (index) {
    if(index!==3) {
      this.props.updateOptionalTabIndex(-1) // 归一
    }
    switch (index) {
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
        this.handleSwitchOptionalIndex(0,false)
        break;
      case 4:
        this.props.updateInterfaceState('more')
        break;
      default:
        break;
    }
  }
  // 改变当前optionalTab的类型
  updateOptionalWhichLoading (index) {
    switch (index) {
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
  // 打开app分组
  openPopupEvent() {
    window.location.href = '@showTeams'
  }
  // 手机切换Index  addPoint = true 加埋点  反之不加埋点
  // 重置 所有数据
  // 埋点 不是点击时不要。
  // 改变tabIndex
  // 改变WhichLoading === tabType
  handleSwitchHomeIndex(index, addPoint = true) {
    const {resetState, updateHomeTabIndex} = this.props
    resetState()
    if (addPoint) {
      this.goToTabFunction('tab' + index)
    }
    updateHomeTabIndex(index)
    this.updateHomeWhichLoading(index)
  }
  handleSwitchOptionalIndex(index, addPoint=true) {
    const {resetState, updateOptionalTabIndex} = this.props
    resetState()
    if (addPoint) {
      this.goToTabFunction('optional' + index)
    }
    updateOptionalTabIndex(index)
    this.updateOptionalWhichLoading(index)
  }
  switchTabIndex(type, index) {
    const activeIndex = this.props.type === 'home' ? this.props.activeHomeTabIndex : this.props.activeOptionalTabIndex;
    if(index===activeIndex) return
    this.props.updatePageConfig({activeTabConfig: {
      index: index,
      type
    }})
  }
  render() {
    const tabClassName = this.props.type === 'home' ? 'tab-box home-tab bot-border' : 'tab-box optional-tab bot-border';
    const menuList = this.props.type === 'home' ? this.props.homeTabMenuList : this.props.optionalTabMenuList;
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
                key={index} onClick={()=>this.switchTabIndex(this.props.type, index)}>
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

TabHeader.propTypes = {
  homeTabMenuList: PropTypes.array,
  optionalTabMenuList: PropTypes.array,
  activeHomeTabIndex: PropTypes.number,
  activeOptionalTabIndex: PropTypes.number,
  type: PropTypes.string,
  theme: PropTypes.string,
  optionalTeam: PropTypes.string,
  activeTabConfig: PropTypes.object
};

const mapStateToProps = (state,store) => {
  return {
    homeTabMenuList: state.tab.tabMenuData.homeTabMenuList,
    optionalTabMenuList: state.tab.tabMenuData.optionalTabMenuList,
    activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
    activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,
    theme: state.pageConfig.theme,
    optionalTeam: state.nativeData.optionalTeam,
    activeTabConfig: state.pageConfig.activeTabConfig
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
    updatePageConfig:(activeTabConfig)=>{dispatch(updatePageConfig(activeTabConfig))},
    updateOptionalTabIndex: activeOptionalTabIndex => dispatch(updateTabIndex({ activeOptionalTabIndex })),
    updateInterfaceState: whichLoading => dispatch(updateInterfaceState({whichLoading})),
    resetState:()=>dispatch(resetState())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);
