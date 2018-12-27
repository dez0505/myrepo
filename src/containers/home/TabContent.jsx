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
import { refreshListEvent } from '../../actions/home'
import { updateTabIndexCallBack } from '../../actions/home'
// MutationEvent
import { updateListData } from '../../actions/list'
// Swiper
import './TabContent.scss'
import Swiper from 'swiper'
class TabContent extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      hasStockArray:  ['topLine', 'news', 'qus', 'event', 'notice', 'report'],
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
        // params  index type hasMandian
        that.props.updateTabIndexCallBack(swiper.activeIndex, 'home', true)
      }
    })
    this.mySwiper = mySwiper
  }
  shouldComponentUpdate(props, state) {
    if(props.listData !== this.props.listData || props.whichLoading !==this.props.whichLoading) {
      return true
    } else {
      return false
    }
  }
  componentWillReceiveProps(props) {
    // 发当前列表行情通知
    this.watchUpdateMarket(props)
    // 监听新的行情数据更新列表
    this.watchListData(props)
    // 根据optionalCode进行重新刷新列表
    this.watchOptionalCode(props)
    // 根据home点击切换来切换列表
    this.watchActiveHomeIndex(props)
    // app端刷新功能
    this.watchUpdateRefreshLoading(props)
  }
  //  只有自选时才监听
  // 监听optionCode是否改变执行相关逻辑 刷新自选列表
  watchOptionalCode(props) { 
    if(props.activeHomeTabIndex !== 3) return
    if(props.optionalCode!==this.props.optionalCode) {
      // 刷新列表事件
      this.props.refreshListEvent();
    }
  }
  watchUpdateRefreshLoading(props) {
    if(this.props.updateRefreshLoading!==props.updateRefreshLoading) {
      this.props.refreshListEvent();
    }
  }
  // 监听列表数据变化进行发通知
  watchListData(props) {
    const {whichLoading, listData} = props
    // 切换到这此列表需要重新发通知
    const isTrue = this.state.hasStockArray.some((item) => {
        return item === whichLoading
    })
    if( !listData.length || !isTrue ) return
    if(listData.length !== this.props.listData.length) {
      switch (whichLoading) {
        case 'topLine':
          const hasStocksArray = listData.filter(
            item => item.Stocks.length > 0
          )
          const scoketCodeArray = hasStocksArray.map(
            item => item.Stocks[0].Symbol
          )
          if(!window.devMode) {
           window.updateLinster()
          }
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
          if(!window.devMode) {
            window.updateLinster()
          }
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
    const isTrue = this.state.hasStockArray.some((item) => {
        return item === whichLoading
    })
    if (!listData.length || !isTrue) return
    if (updateMarket !== this.props.updateMarket) {
      const newArray = listData.map(item=>item)
      const array = market.map(item=>item)
      switch(whichLoading) {
        case 'topLine':
        newArray.forEach(val => {
          if(val.Stocks.length>0) {
            if(array.length>0){
              val.stocksNum = array.shift()[3]
            }
          }
        })
        break;
        default:
        newArray.forEach(val => {
          const needStock = array.filter(v => v[0] === val.tradingCode)
          if (needStock.length > 0) {
            val.stockNum = needStock[0][3]
            val.stockPrice = needStock[0][2]
          }
        })
      }
      this.props.updateListData({listData: newArray})
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
    const optionalArray =  this.state.hasStockArray.slice(1)
    const isOptional = optionalArray.some((item) => {
      return item === whichLoading
    })
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
              {isOptional ? <Optional></Optional> :<NoData tabType='optional'></NoData>}
            </div>
            <div className="swiper-slide" style={ minHeightStyle }>
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
  market: state.nativeData.market,                                          //app传来的行情数据
  optionalCode: state.nativeData.optionalCode,                              //根据optionalCode改变来进行重新请求数据
  updateMarket: state.pageConfig.updateMarket,                              //行情数据是否改变 3s一次
  callBackHome: state.pageConfig.callBackHome,                              //是否回到首页
  updateRefreshLoading: state.pageConfig.updateRefreshLoading,              //app通知刷新列表
})

const mapDispatchToProps = dispatch => ({
  updateListData: listData=> dispatch(updateListData(listData)),
  refreshListEvent:()=>{dispatch(refreshListEvent())},
  updateTabIndexCallBack: (index,type,hasMandian)=>dispatch(updateTabIndexCallBack(index,type,hasMandian))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)