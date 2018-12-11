import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Swiper
import './TabContent.scss'
import Swiper from 'swiper'

export default class TabContent extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null
    }
  }
  componentDidMount() {
    let mySwiper = new Swiper('.tab-swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentDidUpdate() {
    if(this.state.mySwiper){
      this.state.mySwiper.update()
    }
  }
  render() {
    return (
      <div className='swiper-container tab-swiper'>
        <div className="swiper-wrapper">
            <div className="swiper-slide">1</div>
            <div className="swiper-slide">2</div>
            <div className="swiper-slide">3</div>
            <div className="swiper-slide">4</div>
            <div className="swiper-slide">5</div>
        </div>
      </div>
    )
  }
}
