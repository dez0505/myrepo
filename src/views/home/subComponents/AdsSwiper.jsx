import React, { Component } from 'react';
import './AdsSwiper.scss'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.scss'
class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
  }
  componentDidMount() {
    console.log('adsSwiper', this.props)
  }
  render() {
    return (
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    ) 
  }
}
export default AdsSwiper