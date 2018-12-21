import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// component
import TopLine from '../homeTab/TopLine'
import Cheif from '../homeTab/Cheif'
import Live from '../homeTab/Live'
import Optional from '../homeTab/Optional'
import More from '../homeTab/More'
import NoData from '../common/NoData'
// ActionSheet
import getCheifList  from '../../actions/tab/cheif'
import getTopLineList  from '../../actions/tab/topLine'
import getLiveList from '../../actions/tab/live'
import { getNewsList, getOptionalList } from '../../actions/tab/optional'
import { updatePageConfig } from '../../actions/index'
// MutationEvent
import { updateLoadingState, updateListData ,resetState} from '../../actions/list'
// Swiper
import './TabContent.scss'
import Swiper from 'swiper'
// utils
import { deepClone } from '../../utils/common'

class TabContent extends Component {
  static propTypes = {
    activeHomeTabIndex: PropTypes.number
  }
  constructor(props) {
    super(); //可以不给props
    this.state = {
    }
    this.mySwiper = null
  }
  componentDidMount() {
    const that = this
    let mySwiper = new Swiper('.tab-swiper', {
      autoplay: false,
      threshold: 100,
      touchMoveStopPropagation: false,
      onSlideChangeEnd: function (swiper) {
        that.props.updatePageConfig({activeTabConfig: {
          index: swiper.activeIndex,
          type: 'home'
        }})
      }
    })
    this.mySwiper = mySwiper
  }
  componentWillReceiveProps(props) {
    this.watchWhichLoading(props)
    this.watchRefreshLoading(props)
    this.watchLoadLoading(props)
    this.watchUpdateMarket(props)
    this.watchListData(props)
    this.watchOptionalCode(props)
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  // 监听optionCode是否改变执行相关逻辑 刷新自选列表
  watchOptionalCode(props) {
    if(props.activeHomeTabIndex!==3) return
    if(props.optionalCode!==this.props.optionalCode) {
      // alert(props.optionalCode+'____'+this.props.optionalCode)
      this.props.resetState()
      this.props.updateLoadingState({
        refreshLoading: true
      }) 
    }
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
    if(props.listData.length !== this.props.listData.length) {
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
    console.log('updateLinster')
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
  watchUpdateMarket(props) {
    if(props.updateMarket!==this.props.updateMarket) {
      console.log(11111)
      switch(this.props.whichLoading) {
        case 'topLine':
          if (!props.listData.length) return
          const newArray = deepClone(props.listData) 
          let array = props.market.map(item=>item)
          for(let val of newArray) {
            if(val.Stocks.length>0) {
              if(array.length>0){
                val.stocksNum = array.shift()[3]
              }
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
        case 'event':
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
    const newArray = deepClone(list)
    const array = market.map(item=>item)
    for (let val of newArray) {
      const needStock = array.filter(v => v[0] === val.tradingCode)
      if (needStock.length > 0) {
        val.stockNum = needStock[0][3]
        val.stockPrice = needStock[0][2]
      }
    }
    this.props.updateListData({listData: newArray})
  }
  // 监听whichLoading使设置当前tabType,并刷新状态为true
  watchWhichLoading(props) {
    if( props.whichLoading !== this.props.whichLoading && props.whichLoading && props.whichLoading!=='more' ) {
      // 由于异步的影响不能在这里设置变量tabType
      // if(this.props.refreshLoading) return
      this.props.updateLoadingState({
        refreshLoading: true
      })
    }
  }
  // 监听index让swiper滑动
  watchActiveHomeIndex(props,state) {
    if(props.activeHomeTabIndex !== this.props.activeHomeTabIndex) {
      if(this.mySwiper) {
        this.mySwiper.slideTo(props.activeHomeTabIndex, 100, false)
      }
    }
  }
  componentDidUpdate(props) {
    if(this.props.callBackHome!==props.callBackHome) {
      if(this.mySwiper){
        this.mySwiper.update({ updateTranslate:false })
      }
    }
  }
  renderLive(whichLoading,listData) {
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
    const { whichLoading, listData } = this.props
    const minHeightStyle = {
      minHeight: this.props.scrollHeight - 38
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
              { this.renderLive(whichLoading, listData) }
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              <Optional></Optional>
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
              {/* 切换效果慢，是因为没有将scrollElement要顶部 */}
              {whichLoading === 'more' ?  <More  ></More> :  <NoData tabType='more'></NoData>}
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
  scrollHeight: state.pageConfig.scrollHeight,                              //设置最小列表的高度，来避免清空数据时，列表抖动
  refreshLoading: state.list.loadingState.refreshLoading,                   //当refreshloading为true再根据whichLoading来判断执行哪个接口
  loadLoading: state.list.loadingState.loadLoading,                         //根据loadLoading为true再根据whichLoading来加载更多哪个接口
  market: state.nativeData.market,                         //根据loadLoading为true再根据whichLoading来加载更多哪个接口
  optionalCode: state.nativeData.optionalCode,              //根据optionalCode改变来进行重新请求数据
  updateMarket: state.pageConfig.updateMarket,
  callBackHome: state.pageConfig.callBackHome
})

const mapDispatchToProps = dispatch => ({
  getTopLineList: type => dispatch(getTopLineList(type)),
  getCheifList: type => dispatch(getCheifList(type)),
  getLiveList: (type,style) => dispatch(getLiveList(type,style)),
  getNewsList: type => dispatch(getNewsList(type)),
  getOptionalList: (type,style) => dispatch(getOptionalList(type,style)),
  updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
  updateListData: listData=> dispatch(updateListData(listData)),
  resetState:()=>dispatch(resetState()),
  updatePageConfig:(activeTabConfig)=>{dispatch(updatePageConfig(activeTabConfig))}

})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)