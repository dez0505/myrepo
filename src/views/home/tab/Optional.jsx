import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTabIndex } from '../../../actions/tab'

import Swiper from 'swiper'
// component
import TabHeaderCase from '../../../containers/TabHeaderCase'
import NoData from './NoData'
import News from './subComponents/News'
import Qus from './subComponents/Qus'
import Event from './subComponents/Event'
import Notice from './subComponents/Notice'
import Report from './subComponents/Report'


export class Optional extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null,
    }
  }
  componentDidMount() {
    const that = this
    let mySwiper = new Swiper('.optional-swiper', {
      autoplay: false,
      threshold: 100,
      touchMoveStopPropagation: false,
      onSlideChangeEnd: function (swiper) {
        if(that.props.activeHomeTabIndex!==3)return
        that.props.updateTabIndex(swiper.activeIndex)
      }
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  watchActiveHomeIndex(props,state) {
    if(props.activeOptionalTabIndex !== this.props.activeOptionalTabIndex) {
      if(state.mySwiper) {
        state.mySwiper.slideTo(props.activeOptionalTabIndex, 100, false)
      }
    }
  }
  render() {
    const minHeightStyle = {
      minHeight: this.props.scrollHeight - 76
    }
    const whichLoading = this.props.whichLoading
    const listData = this.props.listData
    return (
      <div>
        <TabHeaderCase type='optional'></TabHeaderCase> 
        <div className='swiper-container optional-swiper'>
          <div className="swiper-wrapper">
              <div className="swiper-slide" style={ minHeightStyle }>
                { listData.length && whichLoading === 'news' ? <News list={listData} ></News> : <NoData tabType='news'></NoData>}
              </div>
              <div className="swiper-slide" style={ minHeightStyle }>
                { listData.length && whichLoading === 'qus' ? <Qus list={listData} ></Qus> : <NoData tabType='qus'></NoData>}
              </div>
              <div className="swiper-slide" style={ minHeightStyle }>
                { listData.length && whichLoading === 'event' ? <Event list={listData} ></Event> : <NoData tabType='event'></NoData>}
              </div>
              <div className="swiper-slide" style={ minHeightStyle }>
                { listData.length && whichLoading === 'notice' ? <Notice list={listData} ></Notice> : <NoData tabType='notice'></NoData>}
              </div>
              <div className="swiper-slide" style={ minHeightStyle }>
                { listData.length && whichLoading === 'report' ? <Report list={listData} ></Report> : <NoData tabType='report'></NoData>}
              </div>
          </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  scrollHeight: state.pageConfig.scrollHeight,                              //设置最小列表的高度，来避免清空数据时，列表抖动
  listData: state.list.listData,                                            //判断listData是否为空数组来加载状态组件或列表组件
  whichLoading: state.list.interfaceState.whichLoading,                     //监听tab已切换，来刷新当前列表数据 使刷新状态为true
  activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,            //当点击时，swiper要根据index进行滚动
  activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,            //当点击时，swiper要根据index进行滚动
})

const mapDispatchToProps = dispatch => {
  return {
    updateTabIndex: activeOptionalTabIndex => dispatch(updateTabIndex({ activeOptionalTabIndex })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Optional)
