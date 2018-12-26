import React, { Component } from 'react';
import './TabHeader.scss'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// actions
import { updateTabIndexCallBack } from '../../actions/home'

class TabHeader extends Component {
  // 打开app分组
  openPopupEvent() {
    window.location.href = '@showTeams'
  }
  switchTabIndex(type, index) {
    // params  index type hasMandian
    this.props.updateTabIndexCallBack(index, type, true)
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
};

const mapStateToProps = (state,store) => {
  return {
    homeTabMenuList: state.tab.tabMenuData.homeTabMenuList,
    optionalTabMenuList: state.tab.tabMenuData.optionalTabMenuList,
    activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
    activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,
    theme: state.pageConfig.theme,
    optionalTeam: state.nativeData.optionalTeam,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateTabIndexCallBack: (index,type,hasMandian)=>dispatch(updateTabIndexCallBack(index,type,hasMandian))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);
