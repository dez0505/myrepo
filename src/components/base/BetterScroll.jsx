import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { Icon } from 'antd-mobile';
import Arrow from './Arrow.jsx'
import './BetterScroll.scss'

import { updateInterfaceParams, updateLoadingState, resetState } from '@/actions/list'
import { connect } from 'react-redux'

class BetterScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: '下拉刷新...',
      refreshTime: '刷新时间',
      botText: '上拉加载...',
      topIconDirection: 'down',
    };
    this.scroll= null
  }
  componentDidMount() {
    this._initScroll()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.initLoading !== this.props.initLoading && !nextProps.initLoading ) {
        this._pullingDownUpComplete()
    }
    if(!nextProps.loadLoading && nextProps.loadLoading !== this.props.loadLoading) {
      this._pullingDownUpComplete()
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
    this.scroll.on('pullingDown', () => {
      this.props.resetState()
      this.props.updateLoadingState({initLoading: true}) // 更新refreshLoading 表示要home一些数据要重新请求了
      this.props.updateHomeContent() // 
    })
    this.scroll.on('pullingUp', () => {
      if(this.props.isNoMoreData || this.props.isNoData) return  //如果当前列表没有更多数据或根据没数据就不给加载
      this.props.updateLoadingState({loadLoading: true}) // 更新refreshLoading 表示要home一些数据要重新请求了
    })
    if (true) {
      this.scroll.on('scroll', (pos) => {
        // console.log('scrollOffsetTop', document.querySelector('.inner-scroll-warpper').offsetTop)
        // const scrollHeight = document.querySelector('.inner-scroll-warpper').offsetTop // list元素的位置
        // this.listOffsetTop.value = scrollHeight
        // this.activeScrollValue.x = -(pos.x)
        // this.activeScrollValue.y = -(pos.y) // 滚动的距离
        if (pos.y >= 60) {
          this.setState({
            topIconDirection: 'up'
          }) 
        } else {
          this.setState({
            topIconDirection: 'down'
          }) 
        }
      })
    }
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
        <div className="load-box" style={{ display: this.props.isNoData || this.props.whichLoadedFail ? 'none' : null }}>
          <div className="scroll-load">
            <div className="bottom-icon">
              <Icon style={{ display: this.props.isNoMoreData ? 'none' : null }} type='loading' text='loading' />
            </div>
            <div className="bot-text">{botText}</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state,store) => {
  return {
    loadLoading: state.list.loadingState.loadLoading,
    initLoading: state.list.loadingState.initLoading,
    isNoData: state.list.dataState.isNoData,
    isNoMoreData: state.list.dataState.isNoMoreData,
    whichLoading: state.list.interfaceState.whichLoading,
    whichLoadedFail: state.list.interfaceState.whichLoadedFail,
    titleheight: state.pageConfig.titleheight
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateInterfaceParams: pageNum => dispatch(updateInterfaceParams({ pageNum })),
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
    resetState:()=>dispatch(resetState())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetterScroll);