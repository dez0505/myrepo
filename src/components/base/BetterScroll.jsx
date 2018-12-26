import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import { Icon } from 'antd-mobile';
import Arrow from './Arrow.jsx'
import './BetterScroll.scss'
import { sendIOSMessage } from '@/utils/common'

import { updateInterfaceParams, updateLoadingState, resetState } from '@/actions/list'
import { updatePageConfig } from '../../actions/index'
import { loadListEvent, refreshHomeEvent } from '../../actions/home'
import { connect } from 'react-redux'

class BetterScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topIconDirection: 'down'
    };
    this.scroll= null
  }
  componentDidMount() {
    this._initScroll()
  }
  componentWillReceiveProps(nextProps) {
    const { initLoading, loadLoading, refreshLoading } = this.props
    const isInitLoading = !nextProps.initLoading && (nextProps.initLoading !==initLoading)
    const isLoadLoading = !nextProps.loadLoading && (nextProps.loadLoading !==loadLoading)
    const isRefreshLoading = !nextProps.refreshLoading && (nextProps.refreshLoading !==refreshLoading)
    if (isInitLoading || isLoadLoading || isRefreshLoading) {
        this._pullingDownUpComplete()
    }
    if(nextProps.scrollToStartPosition !== this.props.scrollToStartPosition) {
      this.scrollToElement('#listContent')
    }
  }
  _initScroll() {
    this.scroll = new BScroll('#wrapper',{
      probeType: 3,
      click: true,
      scrollX: true,
      pullDownRefresh: {
        threshold: 60,
        stop: 50
      },
      pullUpLoad: {
        threshold: -20
      }
    })
    // 下拉刷新
    this.scroll.on('pullingDown', () => {
      this.props.refreshHomeEvent()
    })
    // 上拉加载
    this.scroll.on('pullingUp', () => {
      if(this.hasLoadMore('model')) {//列表为loading=true时，下面这两个一个不能执行
        this.props.loadListEvent()
      } else {
         this.scroll.finishPullUp()
      }
    })
    // 监听scroll事件
    this.scroll.on('scroll', (pos) => {
      const scrollHeight = document.getElementById('listContent').offsetTop // list元素的位置
      const tabIsFixed = -(pos.y)>=scrollHeight
      // 与app交互发送刷新状态
      if( tabIsFixed && this.props.tabIsFixed !== tabIsFixed) {
        if (window.quote && window.quote.changeHomeStatus) {
          window.quote.changeHomeStatus(true)
        } else {
          sendIOSMessage('changeHomeStatus',true)
        }
        this.props.updateTabIsFixed(true)
      } else if (this.props.tabIsFixed !== tabIsFixed) {
        if (window.quote && window.quote.changeHomeStatus) {
          window.quote.changeHomeStatus(false)
        } else {
          sendIOSMessage('changeHomeStatus',false)
        }
        this.props.updateTabIsFixed(false)
      }
      // 改变下拉刷新的尖头方向
      if (pos.y >= 60 && this.state.topIconDirection === 'down') {
        this.setState({
          topIconDirection: 'up'
        }) 
      }  
      if(pos.y <60 && this.state.topIconDirection === 'up'){
        this.setState({
          topIconDirection: 'down'
        }) 
      }
    })
    this.scroll.on('refresh', () => {
    })
  }
  _pullingDownUpComplete () {
    console.log('接口请求完毕,正在重新布置scroll')
    this.scroll.finishPullDown()
    this.scroll.finishPullUp()
    this.scroll.refresh() // 重新计算元素高度
  }
  disable () {
    // 代理better-scroll的disable方法
    this.scroll && this.scroll.disable()
  }
  enable () {
    // 代理better-scroll的enable方法
    this.scroll && this.scroll.enable()
  }
  refresh () {
    // 代理better-scroll的refresh方法
    this.scroll && this.scroll.refresh()
  }
  scrollTo () {
    // 代理better-scroll的scrollTo方法
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  scrollToElement () {
    // 代理better-scroll的scrollToElement方法
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  hasLoadMore(type='view') { // view 是视图上的渲染   model 是更多时数据渲染
    // 没有更多、没有数据、more、加载失败、refreshLoading、loadLoading 都得为false
    const {isNoMoreData, isNoData, whichLoading, whichLoadedFail, refreshLoading } = this.props
    if (type==='view') {
      return !isNoData && whichLoading!=='more' && !whichLoadedFail && !refreshLoading 
    } else {
      return !isNoMoreData && !isNoData && whichLoading!=='more' && !whichLoadedFail && !refreshLoading
    }
  }
  render() {
    const arrowClassName = 'arrow ' + this.state.topIconDirection 
    const botText = this.props.loadLoading ? '疯狂加载中...' : this.props.isNoMoreData ? '没有更多的记录了...' : '上拉加载更多...'
    const topText = this.props.initLoading ? '更新数据中...' : this.state.topIconDirection === 'up' ? '松手刷新' : '下拉刷新'
    return (
      <div id="wrapper" className='scroll-wrapper' style={{ top:this.props.titleheight+'px' }}>
        <div className="scroll-content">
        <div className="refresh-box">
          <div className="scroll-refresh">
            <div className="lf-icon">
            {
              this.props.initLoading ? <Icon type='loading' text='loading' /> : <Arrow arrowClassName={arrowClassName}></Arrow>
            }
            </div>
            <div className="center-text">
              <div>{topText}</div>
              <div>{this.props.refreshTime}</div>
            </div>
            <div style={{width:'30px',height:'30px'}}></div>
          </div>
        </div>
        {this.props.children}
        <div className="load-box" style={{ display : this.hasLoadMore('view') ? null : 'none' }}>
          <div className="scroll-load">
            <div className="bottom-icon">
              <Icon style={{ display: this.props.isNoMoreData || this.props.isNoData ? 'none' : null }} type='loading' text='loading' />
            </div>
            <div className="bot-text">{botText}</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
BetterScroll.propTypes = {
  loadLoading: PropTypes.bool,
  initLoading: PropTypes.bool,
  refreshLoading: PropTypes.bool,
  isNoData: PropTypes.bool,
  isNoMoreData: PropTypes.bool,
  whichLoading: PropTypes.string,
  whichLoadedFail: PropTypes.string,
  titleheight: PropTypes.number,
  tabIsFixed: PropTypes.bool,
}
const mapStateToProps = (state,store) => {
  return {
    loadLoading: state.list.loadingState.loadLoading,
    initLoading: state.list.loadingState.initLoading,
    isNoData: state.list.dataState.isNoData,
    isNoMoreData: state.list.dataState.isNoMoreData,
    refreshLoading: state.list.loadingState.refreshLoading,
    whichLoading: state.list.interfaceState.whichLoading,
    whichLoadedFail: state.list.interfaceState.whichLoadedFail,
    titleheight: state.pageConfig.titleheight,
    tabIsFixed: state.pageConfig.tabIsFixed,
    scrollToStartPosition: state.pageConfig.scrollToStartPosition
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateInterfaceParams: pageNum => dispatch(updateInterfaceParams({ pageNum })),
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
    updateTabIsFixed: tabIsFixed => dispatch(updatePageConfig({tabIsFixed})),
    loadListEvent: () => dispatch(loadListEvent()),
    refreshHomeEvent: () => dispatch(refreshHomeEvent()),
    resetState:()=>dispatch(resetState())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetterScroll);