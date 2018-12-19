import React, { Component } from 'react';
// Swiper
import './AdsSwiper.scss'
import Swiper from 'swiper'
// utils
import { goToAPP } from '@/utils/common'

class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      adsSwiper: null
    }
  }
  componentDidMount() {
    const adsSwiper = new Swiper('.ads-swiper', {
      loop: true,
      autoplay:5000,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction: false,
      onClick: (swiper) => {
        const realIndex = swiper.realIndex
        goToAPP(this.props.adsList[realIndex], 'ads')
      }
    })
    if(adsSwiper.slides.length <= 3) {
      adsSwiper.lockSwipes()
    }
    this.setState({ adsSwiper })
  }
  componentDidUpdate() {
    if(this.state.adsSwiper){
      this.state.adsSwiper.update()
    }
  }
  render() {
    const adsList = this.props.adsList
    return (
      <div>
        <div className="ads-box">
          <div className="swiper-container ads-swiper">
            <div className="swiper-wrapper">
              {adsList.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index} style={{backgroundImage:'url('+item.ImageUrl+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',backgroundPosition:'center'}}></div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    ) 
  }
}
export default AdsSwiper