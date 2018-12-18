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
import { getNewsList, getOptionalList } from '../../../actions/tab/optional'
// MutationEvent
import { updateLoadingState, updateListData ,resetState} from '../../../actions/list'
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
    this.watchMarket(props)
    this.watchListData(props)
    this.watchOptionalCode(props)
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  // 监听optionCode是否改变执行相关逻辑 刷新自选列表
  watchOptionalCode(props) {
    if(props.activeHomeTabIndex!==3) return
    this.props.resetState()
    this.props.updateLoadingState({
      refreshLoading: true
    })
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
          this.props.getOptionalList('init','qus')
          break;
        case 'event':
          this.props.getOptionalList('init','event')
          break;
        case 'notice':
          this.props.getOptionalList('init','notice')
          break;
        case 'report':
          this.props.getOptionalList('init','report')
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
          this.props.getOptionalList('load','qus')
          break;
        case 'event':
          this.props.getOptionalList('load','event')
          break;
        case 'notice':
          this.props.getOptionalList('load','notice')
          break;
        case 'report':
          this.props.getOptionalList('load','report')
          break;
        default:
          break;
      }
    }
  }
  // 监听列表数据变化进行发通知
  watchListData(props) {
    if(!props.listData.length) return
    if(props.listData !== this.props.listData) {
      switch (props.whichLoading) {
        case 'topLine':
          const hasStocksArray = props.listData.filter(
            item => item.Stocks.length > 0
          )
          const scoketCodeArray = hasStocksArray.map(
            item => item.Stocks[0].Symbol
          )
          if (window && window.quote && window.quote.requestQuote) {
            window.quote.requestQuote(scoketCodeArray)
          } else if (
            window.webkit &&
              window.webkit.messageHandlers &&
              window.webkit.messageHandlers.requestQuote
          ) {
            window.webkit.messageHandlers.requestQuote.postMessage({
              body: scoketCodeArray
            })
          }
          break;
        case 'news': 
          this.sendStock(props.listData)
          break
        case 'qus':
          this.sendStock(props.listData)
          break
        case 'event': 
          this.sendStock(props.listData)
          break
        case 'notice': 
          this.sendStock(props.listData)
          break
        case 'report': 
          this.sendStock(props.listData)
          break
        default:
          break;
      }
    }
  }
  sendStock (newval) {
    if (newval.length === 0) return
    const scoketCodeArray = newval.map(
      item => item.tradingCode
    )
    const filterArray = scoketCodeArray.filter((x, index, self) => self.indexOf(x) === index)
    if (window && window.quote && window.quote.requestQuote) {
      window.quote.requestQuote(filterArray)
    } else if (
      window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.requestQuote
    ) {
      window.webkit.messageHandlers.requestQuote.postMessage({
        body: filterArray
      })
    }
  }

  // 监听market行情数据是否变化了。变化了就要对列表进行渲染
  watchMarket(props) {
    if(props.market!==this.props.market&&props.market) {
      switch(this.props.whichLoading) {
        case 'topLine':
          if (!props.listData.length) return
          const newArray = props.listData.map(item=>item)
          let array = props.market.dataRecord
          for(let val of newArray) {
            if(val.Stocks.length>0) {
              val.stocksNum = array.shift()[3]
            }
          }
          this.props.updateListData({listData: newArray})
        break;
        case 'news':
          this.handleStock(props.listData, props.market)
          break
        case 'qus':
          this.handleStock(props.listData, props.market)
          break
        case 'bigEvent':
          this.handleStock(props.listData, props.market)
          break
        case 'notice':
          this.handleStock(props.listData, props.market)
          break
        case 'report':
          this.handleStock(props.listData, props.market)
          break
        default:
      }
    }
  }
  // 根据行情处理新的数据
  handleStock (list, market) {
    if (!list.length) return
    const newArray = list.map(
      item => item
    )
    const array = market.dataRecord
    for (let val of newArray) {
      const needStock = array.filter(v => v[0] === val.tradingCode)
      if (needStock.length > 0) {
        val.stockNum = needStock[0][3]
        val.stockPrice = needStock[0][2]
      }
    }
    this.updateListData(newArray)
  }


  // 监听whichLoading使设置当前tabType,并刷新状态为true
  watchWhichLoading(props) {
    if( props.whichLoading !== this.props.whichLoading && props.whichLoading) {
      // 由于异步的影响不能在这里设置变量tabType
      this.props.resetState()
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
    const whichLoading = this.props.whichLoading
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
  activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,            //当点击时，swiper要根据index进行滚动
  listData: state.list.listData,                                            //判断listData是否为空数组来加载状态组件或列表组件
  whichLoading: state.list.interfaceState.whichLoading,                     //监听tab已切换，来刷新当前列表数据 使刷新状态为true
  htid: state.pageConfig.htid,                                              //初始化时 第一次初始化 刷新状态为true 执行topline
  scrollHeight: state.pageConfig.scrollHeight,                              //设置最小列表的高度，来避免清空数据时，列表抖动
  refreshLoading: state.list.loadingState.refreshLoading,                   //当refreshloading为true再根据whichLoading来判断执行哪个接口
  loadLoading: state.list.loadingState.loadLoading,                         //根据loadLoading为true再根据whichLoading来加载更多哪个接口
  market: state.nativeData.market,                         //根据loadLoading为true再根据whichLoading来加载更多哪个接口
  optionalCode: state.nativeData.optionalCode              //根据optionalCode改变来进行重新请求数据
})

const mapDispatchToProps = dispatch => ({
  updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
  getTopLineList: type => dispatch(getTopLineList(type)),
  getCheifList: type => dispatch(getCheifList(type)),
  getLiveList: (type,style) => dispatch(getLiveList(type,style)),
  getNewsList: type => dispatch(getNewsList(type)),
  getOptionalList: (type,style) => dispatch(getOptionalList(type,style)),
  updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
  updateListData: listData=> dispatch(updateListData(listData)),
  resetState:()=>dispatch(resetState())

})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)