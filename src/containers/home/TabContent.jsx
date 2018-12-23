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
    this.watchLoading(props, 'refreshLoading', 'init')
    this.watchLoading(props, 'loadLoading', 'load')
    this.watchUpdateMarket(props)
    this.watchListData(props)
    this.watchOptionalCode(props)
    this.watchUpdateRefreshLoading(props)
  }
  componentWillUpdate(props,state) {
    this.watchActiveHomeIndex(props,state)
  }
  watchUpdateRefreshLoading(props) {
    if(props.updateRefreshLoading !== this.props.updateRefreshLoading && !this.props.refreshLoading) {
      this.props.resetState()
      this.props.updateLoadingState({
        refreshLoading: true
      }) 
    }
  }
  // 监听optionCode是否改变执行相关逻辑 刷新自选列表
  watchOptionalCode(props) {
    if(props.activeHomeTabIndex !== 3) return
    if(props.optionalCode!==this.props.optionalCode) {
      // alert(props.optionalCode+'____'+this.props.optionalCode)
      this.props.updatePageConfig({ updateRefreshLoading: !this.props.updateRefreshLoading })
    }
  }

  // 监听 refreshLoading 与 loadLoading 来调接口
  watchLoading(props, loadingType, type = 'init') {
    if( props[loadingType] !== this.props[loadingType] && props[loadingType] && props.whichLoading) {
      switch (props.whichLoading) {
        case 'topLine':
          this.props.getTopLineList(type)
          break;
        case 'cheif':
          this.props.getCheifList(type)
          break;
        case 'liveA':
          this.props.getLiveList(type, 'A')
          break;
        case 'liveAll':
          this.props.getLiveList(type, 'All')
          break;
        case 'news':
          this.props.getNewsList(type)
          break;
        case 'qus':
          this.props.getOptionalList(type, 'qus')
          break;
        case 'event':
          this.props.getOptionalList(type, 'event')
          break;
        case 'notice':
          this.props.getOptionalList(type, 'notice')
          break;
        case 'report':
          this.props.getOptionalList(type, 'report')
          break;
        default:
          break;
      }
    }
  }
 
  // 监听列表数据变化进行发通知
  watchListData(props) {
    const {whichLoading, listData} = props
    // 切换到这此列表需要重新发通知
    const array = ['topLine', 'news', 'qus', 'event', 'notice', 'report']
    const isTrue = array.some((item) => {
        return item === whichLoading
    })
    if(listData.length === this.props.listData.length) {
     const listIsTrue = listData.every((item,index,array) => {
        return item.Id === listData[index].Id
       });
    }
    if( !listData.length || !isTrue ) return
    if(listData.length !== this.props.listData.length || whichLoading !== this.props.whichLoading) {
      // if(listData.length !== this.props.listData.length || whichLoading !== this.props.whichLoading) {
      switch (whichLoading) {
        case 'topLine':
          const hasStocksArray = listData.filter(
            item => item.Stocks.length > 0
          )
          const scoketCodeArray = hasStocksArray.map(
            item => item.Stocks[0].Symbol
          )
          window.updateLinster()
          console.log('sendIos', whichLoading, listData)
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
          break
        default:
          const stockCodeArray = listData.map(
            item => item.tradingCode
          )
          const filterArray = stockCodeArray.filter((x, index, self) => self.indexOf(x) === index)
          window.updateLinster()
          console.log('sendIos', whichLoading, filterArray)
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
          break;
      }
    }
  }
  

  // 监听market行情数据是否变化了。变化了就要对列表进行渲染
  watchUpdateMarket(props) {
    const {whichLoading, listData, updateMarket, market} = props
    // 切换到这此列表需要重新发通知
    const array = ['topLine', 'news', 'qus', 'event', 'notice', 'report']
    const isTrue = array.some((item) => {
        return item === whichLoading
    })
    if (!listData.length || !isTrue) return
    if (updateMarket !== this.props.updateMarket) {
      console.log('request')
      const newArray = deepClone(listData) 
      const array = market.map(item=>item)
      switch(whichLoading) {
        case 'topLine':
          for(let val of newArray) {
            if(val.Stocks.length>0) {
              if(array.length>0){
                val.stocksNum = array.shift()[3]
              }
            }
          }
        break;
        default:
          for (let val of newArray) {
            const needStock = array.filter(v => v[0] === val.tradingCode)
            if (needStock.length > 0) {
              val.stockNum = needStock[0][3]
              val.stockPrice = needStock[0][2]
            }
          }
      }
      console.log(8888, listData, newArray)
      this.props.updateListData({listData: newArray})
    }
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
  // 处理切换回首页swiper出现的问题
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

TabContent.propTypes = {
  activeHomeTabIndex: PropTypes.number,
  listData: PropTypes.array,
  whichLoading: PropTypes.string,
  scrollHeight: PropTypes.number,
  refreshLoading: PropTypes.bool,
  loadLoading: PropTypes.bool,
  market: PropTypes.any,
  optionalCode: PropTypes.string,
  updateMarket: PropTypes.bool,
  callBackHome: PropTypes.bool,
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
  callBackHome: state.pageConfig.callBackHome,
  updateRefreshLoading: state.pageConfig.updateRefreshLoading
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
  updatePageConfig:(pageConfig)=>{dispatch(updatePageConfig(pageConfig))}

})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)