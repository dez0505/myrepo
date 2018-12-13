import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// Box
import TopLineCase from '@/containers/tab/TopLineCase'
// component
import Optional from './Optional'
import More from './More'
// action
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
      mySwiper: null
    }
  }
  componentDidMount() {
    const that = this
    let mySwiper = new Swiper('.tab-swiper', {
      autoplay: false,
      // threshold: 100,
      touchMoveStopPropagation: false,
      onSlideChangeEnd: function (swiper) {
        that.props.updateHomeTabIndex(swiper.activeIndex)
      }
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentWillReceiveProps(props) {
  }
  componentWillUpdate(props,state) {
    if(state.mySwiper) {
      state.mySwiper.slideTo(props.activeHomeTabIndex, 100, false)
    }
  }
  componentDidUpdate() {
    if(this.state.mySwiper){
      this.state.mySwiper.update()
    }
  }
  render() {
    const  whichLoading = this.props.whichLoading
    return (
      <div className='swiper-container tab-swiper'>
        <div className="swiper-wrapper">
            <div className="swiper-slide">
              <TopLineCase></TopLineCase>
            </div>
            <div className="swiper-slide">
              2
            </div>
            <div className="swiper-slide">
              3
            </div>
            <div className="swiper-slide">
              <Optional whichLoading ={ whichLoading }></Optional>
            </div>
            <div className="swiper-slide">
              <More whichLoading ={ whichLoading }></More>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
})

const mapDispatchToProps = dispatch => ({
  updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)