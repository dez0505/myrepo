import React, { Component } from 'react';
// Swiper
import './AdsSwiper.scss'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

// api

class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null
    }
  }
  componentDidMount() {
    console.log('adsSwiper', this.props)
    this.setState({ mySwiper: new Swiper('.ads-swiper', {
      autoplay: true,//可选选项，自动滑动
      loop: true,
    }) })
  }
  render() {
    return (
      <div className="ads-box">
        <div className="swiper-container ads-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide" >Slide 1</div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    ) 
  }
}
export default AdsSwiper