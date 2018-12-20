import React, { Component } from 'react';
import './TopicSwiper.scss';
import Swiper from 'swiper';
// utils
import { goToAPP } from '../../utils/common'

class TopicSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      topicSwiper: null
    };
  }
  componentDidMount() {
    this.initTopicSwiper()
  }
  shouldComponentUpdate(props){
    if(props.topicList!==this.props.topicList){
      return true
    } else {
      return false
    }
  }
  initTopicSwiper() {
    const adsSwiper = new Swiper('.topic-swiper', {
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
    } else {
      adsSwiper.unlockSwipes()
    }
    this.adsSwiper = adsSwiper
  }
  componentDidUpdate() {
    if(this.adsSwiper){
      this.adsSwiper.destroy(false, false); 
      this.initAdsSwiper()
    }
  }
  render() {
    return (
      <div>
        <div className='split-line'></div> 
        <div className='topic-box'>
          <div className='swiper-container topic-swiper'>
            <div className='swiper-wrapper'>
              {this.props.topicList.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index} style={{backgroundImage:'url('+item.ImageUrl+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',backgroundPosition:'center'}}></div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div> 
      </div>
    );
  }
}
export default TopicSwiper;
