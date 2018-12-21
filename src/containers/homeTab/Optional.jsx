import React, { Component } from 'react'
import Swiper from 'swiper'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { updatePageConfig } from '../../actions/index'
// component
import TabHeader from '../home/TabHeader'
import NoData from '../common/NoData'
import News from '../optionalTab/News'
import Qus from '../optionalTab/Qus'
import Event from '../optionalTab/Event'
import Notice from '../optionalTab/Notice'
import Report from '../optionalTab/Report'

export class Optional extends Component {
 
  constructor(props) {
    super(); //可以不给props
    this.state = {
    }
    this.mySwiper = null
  }
  componentDidMount() {
    const that = this
    let mySwiper = new Swiper('.optional-swiper', {
      autoplay: false,
      threshold: 100,
      touchMoveStopPropagation: false,
      onSlideChangeEnd: function (swiper) {
        // 当滚动下面的tab栏时，若滚动过后tab不为3 则不执行下面的代码
        if(that.props.activeHomeTabIndex!==3)return
          that.props.updatePageConfig({activeTabConfig: {
            index: swiper.activeIndex,
            type: 'optional'
          }})
      }
    })
    this.mySwiper = mySwiper
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  componentDidUpdate(props, state) {
    if(this.props.callBackHome !== props.callBackHome || this.props.listData !== props.listData) {
      if(this.mySwiper){
        this.mySwiper.update({ updateTranslate:false })
      }
    }
  }
  watchActiveHomeIndex(props,state) {
    if(props.activeOptionalTabIndex !== this.props.activeOptionalTabIndex) {
      if(this.mySwiper) {
        this.mySwiper.slideTo(props.activeOptionalTabIndex, 100, false)
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
        <TabHeader type='optional' watch={true}></TabHeader> 
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

Optional.propTypes = {
  scrollHeight: PropTypes.number,
  listData: PropTypes.array,
  whichLoading: PropTypes.string,
  activeOptionalTabIndex: PropTypes.number,
  activeHomeTabIndex: PropTypes.number,
  callBackHome: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  scrollHeight: state.pageConfig.scrollHeight,                              //设置最小列表的高度，来避免清空数据时，列表抖动
  listData: state.list.listData,                                            //判断listData是否为空数组来加载状态组件或列表组件
  whichLoading: state.list.interfaceState.whichLoading,                     //监听tab已切换，来刷新当前列表数据 使刷新状态为true
  activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,            //当点击时，swiper要根据index进行滚动
  activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,            //当点击时，swiper要根据index进行滚动
  callBackHome: state.pageConfig.callBackHome
})

const mapDispatchToProps = dispatch => {
  return {
    updatePageConfig:(activeTabConfig)=>{dispatch(updatePageConfig(activeTabConfig))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Optional)
