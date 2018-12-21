import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile';
import './NoData.scss'
import { updateLoadingState } from '../../actions/list'
import { updatePageConfig } from '../../actions/index'

export class NoData extends Component {
  refreshList() {
    // 没有数据时，不用scrollElement的
    this.props.updatePageConfig({ updateRefreshLoading: !this.props.updateRefreshLoading })
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
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
    updatePageConfig:(pageConfig)=>{dispatch(updatePageConfig(pageConfig))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoData)
