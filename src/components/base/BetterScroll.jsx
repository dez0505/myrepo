import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { Icon } from 'antd-mobile';
import Arrow from './Arrow.jsx'
import './BetterScroll.scss'

import { updateInterfaceParams } from '@/actions/list'
import { connect } from 'react-redux'


class BetterScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: '下拉刷新',
      refreshTime: '刷新时间',
      botText: '上拉加载',
      topIconDirection: 'down',
    };
    this.scroll= null
  }
  componentDidMount() {
    this._initScroll()
    console.log('betterscroll', this.props)
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
      this.$emit('refreshData')
    })
    this.scroll.on('pullingUp', () => {
      // this.loadeMoreList()
    })
    if (this.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        console.log('scrollOffsetTop', document.querySelector('.inner-scroll-warpper').offsetTop)
        const scrollHeight = document.querySelector('.inner-scroll-warpper').offsetTop // list元素的位置
        this.listOffsetTop.value = scrollHeight
        this.activeScrollValue.x = -(pos.x)
        this.activeScrollValue.y = -(pos.y) // 滚动的距离
        if (pos.y >= 60) {
          this.topIconDirection = 'up'
        } else {
          this.topIconDirection = 'down'
        }
      })
    }
    this.scroll.on('refresh', () => {
      // console.log(100101010101, 'scroll刷新完成')
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
    return (
      <div id="wrapper" className='scroll-wrapper'>
        <div className="scroll-content">
        <div className="refresh-box">
          <div className="scroll-refresh">
            <div className="lf-icon">
              <Arrow className='arrow'></Arrow> 
              {/* <Arrow className={'arrow ' + this.state.topIconDirection}></Arrow>  */}
              <Icon type='loading' text='loading' />
            </div>
            <div className="center-text">
              <div>{this.state.topText}</div>
              <div>{this.state.refreshTime}</div>
            </div>
            <div style={{width:'30px',height:'30px'}}></div>
          </div>
        </div>
        {this.props.children}
        <div className="load-box">
          <div className="scroll-load">
            <div className="bottom-icon">
              <Icon type='loading' text='loading' />
            </div>
            <div className="bot-text">{this.state.botText}</div>
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
    refreshLoading: state.list.loadingState.refreshLoading,
    isNoData: state.list.dataState.isNoData,
    isNoMoreData: state.list.dataState.isNoMoreData,
    whichLoading: state.list.interfaceState.whichLoading,
    whichLoadedFail: state.list.interfaceState.whichLoadedFail,
    listData: state.list.listData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateInterfaceParams: pageNum => dispatch(updateInterfaceParams({ pageNum })),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetterScroll);