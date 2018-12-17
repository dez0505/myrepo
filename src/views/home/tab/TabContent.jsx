import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// Box
import TopLine from './subComponents/TopLine'
import Cheif from './subComponents/Cheif'
import Live from './subComponents/Live'
// component
import Optional from './Optional'
import More from './More'
import NoData from './NoData'
// ActionSheet
import getCheifList  from '../../../actions/tab/cheif'
import getTopLineList  from '../../../actions/tab/topLine'
import getLiveList from '../../../actions/tab/live'
import getNewsList from '../../../actions/tab/news'
import getQusList from '../../../actions/tab/qus'
import getEventList from '../../../actions/tab/event'
import getNoticeList from '../../../actions/tab/notice'
import getReportList from '../../../actions/tab/report'
// MutationEvent
import { updateLoadingState } from '../../../actions/list'
import { updateTabIndex } from '@/actions/tab'
// Swiper
import './TabContent.scss'
import Swiper from 'swiper'

class TabContent extends Component {
  static propTypes = {
    activeHomeTabIndex: PropTypes.number
  }
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null,
    }
  }
  componentDidMount() {
    const that = this
    let mySwiper = new Swiper('.tab-swiper', {
      autoplay: false,
      threshold: 100,
      touchMoveStopPropagation: false,
      onSlideChangeEnd: function (swiper) {
        that.props.updateHomeTabIndex(swiper.activeIndex)
      }
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentWillReceiveProps(props) {
    this.watchWhichLoading(props)
    this.watchRefreshLoading(props)
    this.watchLoadLoading(props)
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  // 监听refreshLoading 来调接口
  watchRefreshLoading(props) {
    if( props.refreshLoading !== this.props.refreshLoading && props.refreshLoading && props.whichLoading) {
      switch (props.whichLoading) {
        case 'topLine':
          this.props.getTopLineList('init')
          break;
        case 'cheif':
          this.props.getCheifList('init')
          break;
        case 'liveA':
          this.props.getLiveList('init','A')
          break;
        case 'liveAll':
          this.props.getLiveList('init','All')
          break;
        case 'news':
          this.props.getNewsList('init')
          break;
        case 'qus':
          this.props.getQusList('init')
          break;
        case 'event':
          this.props.getEventList('init')
          break;
        case 'notice':
          this.props.getNoticeList('init')
          break;
        case 'report':
          this.props.getReportList('init')
          break;
        default:
          break;
      }
    }
  }
  watchLoadLoading(props) {
    if( props.loadLoading !== this.props.loadLoading && props.loadLoading && props.whichLoading) {
      switch (props.whichLoading) {
        case 'topLine':
          this.props.getTopLineList('load')
          break;
        case 'cheif':
          this.props.getCheifList('load')
          break;
        case 'liveA':
          this.props.getLiveList('load','A')
          break;
        case 'liveAll':
          this.props.getLiveList('load','All')
          break;
        case 'news':
          this.props.getNewsList('load')
          break;
        case 'qus':
          this.props.getQusList('load')
          break;
        case 'event':
          this.props.getEventList('load')
          break;
        case 'notice':
          this.props.getNoticeList('load')
          break;
        case 'report':
          this.props.getReportList('load')
          break;
        default:
          break;
      }
    }
    
  }
  // 监听whichLoading使设置当前tabType,并刷新状态为true
  watchWhichLoading(props) {
    if( props.whichLoading !== this.props.whichLoading && props.whichLoading) {
      // 由于异步的影响不能在这里设置变量tabType
      this.props.updateLoadingState({
        refreshLoading: true
      })
    }
  }
  // 监听index让swiper滑动
  watchActiveHomeIndex(props,state) {
    if(props.activeHomeTabIndex !== this.props.activeHomeTabIndex) {
      if(state.mySwiper) {
        state.mySwiper.slideTo(props.activeHomeTabIndex, 100, false)
      }
    }
  }
  componentDidUpdate() {
    if(this.state.mySwiper){
      this.state.mySwiper.update()
    }
  }
  handleLiveComponent(whichLoading,listData) {
    if ( whichLoading === 'liveA' ) {
      if ( listData.length ) {
        return(<Live liveList={listData} ></Live> ) 
      } else {
        return (<NoData tabType='liveA'></NoData>)
      }
    } else if( whichLoading === 'liveAll' ) {
      if ( listData.length ) {
        return(<Live liveList={listData} ></Live> ) 
      } else if( whichLoading === 'liveAll' ) {
        return (<NoData tabType='liveAll'></NoData>)
      }
    } else {
      return (<NoData tabType='liveA'></NoData>)
    }
  }
  render() {
    const  whichLoading = this.props.whichLoading
    const listData = this.props.listData
    const minHeightStyle = {
      minHeight: this.props.scrollHeight
    }
    return (
      <div className='swiper-container tab-swiper'>
        <div className="swiper-wrapper">
            <div className="swiper-slide" style={ minHeightStyle }>
              { listData.length && whichLoading === 'topLine' ? <TopLine topLineList={listData} ></TopLine> : <NoData tabType='topLine'></NoData>}
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              { listData.length && whichLoading === 'cheif' ? <Cheif cheifList={listData} ></Cheif> : <NoData tabType='cheif'></NoData>}
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              { this.handleLiveComponent(whichLoading, listData) }
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              <Optional whichLoading ={ whichLoading }></Optional>
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              <More whichLoading ={ whichLoading }></More>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
  listData: state.list.listData,
  whichLoading: state.list.interfaceState.whichLoading,
  htid: state.pageConfig.htid,
  scrollHeight: state.pageConfig.scrollHeight,
  refreshLoading: state.list.loadingState.refreshLoading, //根据refreshloading来进行列表刷新
  loadLoading: state.list.loadingState.loadLoading,       //根据loadLoading来进行加载更多
})

const mapDispatchToProps = dispatch => ({
  updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
  getTopLineList: type => dispatch(getTopLineList(type)),
  getCheifList: type => dispatch(getCheifList(type)),
  getLiveList: (type,style) => dispatch(getLiveList(type,style)),
  getNewsList: type => dispatch(getNewsList(type)),
  getQusList: type => dispatch(getQusList(type)),
  getEventList: type => dispatch(getEventList(type)),
  getNoticeList: type => dispatch(getNoticeList(type)),
  getReportList: type => dispatch(getReportList(type)),
  updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)