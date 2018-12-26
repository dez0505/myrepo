import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile';
import './NoData.scss'
import { refreshListEvent } from '../../actions/home'

export class NoData extends Component {
  refreshList() {
    // 没有数据时，不用scrollElement的
    // hasScrollToElement  ture 跳到顶部   false 不用跳到顶部
    this.props.refreshListEvent(false)
  }
  render() {
    const { whichLoadedFail, tabType, isNoData, whichLoading, refreshLoading } = this.props
    return (
      <div>
        <div className="tab-no-more-data">
          <div className="nodata-state" style={{display:whichLoading===tabType&&isNoData?null:'none'}}>
          </div>
          <div className="load-fail-state" style={{display:whichLoadedFail===tabType?null:'none'}} onClick={()=>{this.refreshList()}}>
            <div>加载失败</div>
            <div>点击重新加载</div>
          </div>
          <div className="loading-state" style={{display:whichLoadedFail!==tabType?null:'none'}}>
            <Icon type='loading' text='loading'  style={{display:refreshLoading?null:'none'}} />
            <div className="text">{refreshLoading?'疯狂加载中...':(isNoData&&whichLoading===tabType)?'暂无数据':'即将加载数据...'}</div>
          </div>
        </div>
      </div>
    )
  }
}
NoData.propTypes = {
  whichLoadedFail: PropTypes.string,
  whichLoading: PropTypes.string,
  isNoData: PropTypes.bool,
  refreshLoading: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  whichLoadedFail: state.list.interfaceState.whichLoadedFail,
  whichLoading: state.list.interfaceState.whichLoading,
  isNoData: state.list.dataState.isNoData, 
  refreshLoading: state.list.loadingState.refreshLoading, 
})
const mapDispatchToProps =  dispatch => {
  return {
    refreshListEvent:()=>{dispatch(refreshListEvent())},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoData)
